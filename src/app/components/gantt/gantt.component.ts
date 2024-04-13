import { Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { LinkService } from '../../services/link.service';
import { Task } from '../../models/tasks';
import { Link } from '../../models/link';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'gantt',
    styleUrls: ['./gantt.component.css'],
    providers: [TaskService, LinkService],
    template: `<div #gantt_here class='gantt-chart'></div>`,
})
export class GanttComponent implements OnInit {
    @ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

    constructor(private taskService: TaskService, private linkService: LinkService, @Inject(PLATFORM_ID) private platformId: Object) { }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            import('dhtmlx-gantt').then(({ gantt }) => {
                gantt.config.date_format = '%Y-%m-%d %H:%i';
                gantt.init(this.ganttContainer.nativeElement);
                gantt.config.readonly = true;

                // Configurar columnas
                gantt.config.columns = [
                    { name: "Empleado", label: "Empleado", width: 200, align: "center" },
                    { name: "text", label: "Actvidad", width: 150, align: "center" },
                    { name: "Sede", label: "Sede", width: 190, align: "center" },
                    { name: "Contrato", label: "Contrato", width: 120, align: "center" }
                ];

                // Configurar DataProcessor para permitir ediciones
                const dp = gantt.createDataProcessor({
                    task: {
                        update: (data: Task) => this.taskService.update(data),
                        create: (data: Task) => this.taskService.insert(data),
                        delete: (id: any) => this.taskService.remove(id),
                    },
                    link: {
                        update: (data: Link) => this.linkService.update(data),
                        create: (data: Link) => this.linkService.insert(data),
                        delete: (id: any) => this.linkService.remove(id),
                    }
                });

                // Obtener datos de las tareas
                this.taskService.get().then((tasks: Task[]) => {
                    // Mapear los datos de las tareas al formato esperado por la Gantt
                    const data = tasks.map(task => ({
                        id: task.id,
                        text: task.text,
                        start_date: task.start_date,
                        end_date: task.end_date,
                        progress: task.progress,
                        duration: task.duration,
                        parent: task.parent,
                        Empleado: task.empleado,
                        Sede: task.sede,
                        Contrato: task.contrato
                    }));

                    // Parsear los datos a la Gantt
                    gantt.parse({ data });
                });
            });
        }
    }
}
