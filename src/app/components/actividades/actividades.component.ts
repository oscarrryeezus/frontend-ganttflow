

import { Departamento } from './../../models/departamento';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActividadesService } from '../../services/actividades.service';
import { Actividades } from '../../models/actividades';
import { Task } from '../../models/tasks';
import { Empleado } from './../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividades: Actividades[] = [];
  edit = false;
  empleados: any[] = [];
  actividadesForm: FormGroup;
  nombreBusqueda: string = '';
  private taskIdCounter: number = 1;

  constructor(private actividadesService: ActividadesService, private taskService: TaskService,private empleadoService: EmpleadoService,
              private fb: FormBuilder) {
    this.actividadesForm = this.fb.group({
      NombreActividad: [''],
      Fecha: [''],
      HoraInicial: [''],
      HoraFinal: [''],
      Duracion: [''],
      Empleado: ['']
    });
  }

  ngOnInit(): void {
    this.cargarActividades();
    this.getEmpleados();
  }

  buscarActividades(): void {
    if (this.nombreBusqueda.trim() !== '') {
      this.actividadesService.obtenerUnaActividad(this.nombreBusqueda).subscribe((data: Actividades) => {
        this.actividades = [data];
      });
    } else {
      this.cargarActividades();
    }
  }

  cargarActividades(): void {
    this.actividadesService.getActividad().subscribe((actividadesData: Actividades[]) => {
      this.actividades = actividadesData;
    });
  }

  generateRandomId(): number {
    // Generar un número aleatorio entre 1 y 1000000
    return Math.floor(Math.random() * 1000000) + 1;
}

guardarActividad(): void {
  const nombreActividad = this.actividadesForm.get('NombreActividad')?.value;
  const fecha = this.actividadesForm.get('Fecha')?.value;
  const horaInicial = this.actividadesForm.get('HoraInicial')?.value;
  const horaFinal = this.actividadesForm.get('HoraFinal')?.value;
  const duracion = this.actividadesForm.get('Duracion')?.value;
  const empleado = this.actividadesForm.get('Empleado')?.value;
  const sede = this.actividadesForm.get('Region')?.value;


  console.log('Nombre de la actividad:', nombreActividad);
  console.log('Fecha:', fecha);
  console.log('Hora inicial:', horaInicial);
  console.log('Hora final:', horaFinal);
  console.log('Duración:', duracion);
  console.log('Empleado:', empleado);


  if (nombreActividad && fecha && horaInicial && horaFinal && duracion && empleado) {
    const actividad = {
      NombreActividad: nombreActividad,
      HorarioTraining: {
        Fecha: fecha,
        HoraInicial: horaInicial,
        HoraFinal: horaFinal
      },
      Duracion: duracion,
      Empleado: empleado
    };

    // Obtener detalles del empleado seleccionado
    this.empleadoService.getEmpleadoByCorreo(empleado).subscribe((detallesEmpleado: any) => {
      console.log('Detalles del empleado obtenidos correctamente:', detallesEmpleado);
      const duracionEnDias = duracion; // Suponiendo que la duración ya está en días

      // Crear la nueva tarea
      const nuevaTarea: Task = {
        id: this.generateRandomId(),
        text: nombreActividad +' :'+ horaInicial + ' - ' + horaFinal,
        start_date: fecha + ' ' + horaInicial + ' ' + horaFinal,
        duration: duracionEnDias, // Pasar la duración en días
        empleado: empleado,
        sede: detallesEmpleado.Region,
        departamento: detallesEmpleado.Departamento,
        contrato: detallesEmpleado.Contrato,
        end_date: '',
        progress: 0,
        parent: 0
      };

      console.log('Nueva tarea a agregar:', nuevaTarea);


      // Guardar la actividad en la colección de actividades
      this.actividadesService.crearActividad(actividad).subscribe(() => {
        console.log('Actividad creada exitosamente');

        // Insertar la nueva tarea en la gantt
        this.taskService.insert(nuevaTarea).then(() => {
          console.log('Tarea agregada exitosamente a la gantt');
          // Recargar las actividades y resetear el formulario después de insertar la tarea
          this.cargarActividades();
          this.resetForm();
        }).catch(error => {
          console.error('Error al agregar tarea a la gantt:', error);
        });
      }, error => {
        console.error('Error al crear la actividad:', error);
      });
    }, error => {
      console.error('Error al obtener detalles del empleado:', error);
    });
  } else {
    console.log('Por favor complete todos los campos antes de guardar.');
  }
}




  onChangeEmpleado() {
    const empleadoCorreo = this.actividadesForm.get('Empleado')?.value;
    if (empleadoCorreo) {
      // Obtener los detalles del empleado por su correo
      this.empleadoService.getEmpleadoByCorreo(empleadoCorreo).subscribe(
        (empleado: Empleado) => {
          // Actualizar los campos del formulario con los detalles obtenidos
          this.actividadesForm.patchValue({
            // Aquí debes ajustar los nombres de los campos según corresponda en tu formulario
            Sede: empleado.Region,
            Departamento: empleado.Departamento,
            Contrato: empleado.Contrato
          });
        },
        (error: any) => {
          console.error('Error al obtener los detalles del empleado:', error);
        }
      );
    }
  }




  resetForm(): void {
    this.actividadesForm.reset();
    this.edit = false;
  }

  editarActividad(actividadData: Actividades): void {
    if (actividadData && actividadData.NombreActividad) {
      this.edit = true;
      const fecha = new Date(actividadData.HorarioTraining.Fecha);
      const formattedFecha = fecha.toISOString().split('T')[0]; // Formatear la fecha a "yyyy-MM-dd"
      this.actividadesForm.setValue({
        NombreActividad: actividadData.NombreActividad,
        Fecha: formattedFecha,
        HoraInicial: actividadData.HorarioTraining.HoraInicial,
        HoraFinal: actividadData.HorarioTraining.HoraFinal
      });
      console.log('Actividad Editada exitosamente');
    } else {
      console.error('Error al editar la Actividad: actividadData o actividadData.NombreActividad es nulo o indefinido');
    }
  }

  eliminarActividad(nombreActividad: string): void {
    this.actividadesService.eliminarActividad(nombreActividad).subscribe(() => {
        this.cargarActividades();
        console.log('Actividad Eliminada exitosamente');

        this.taskService.get().then((tasks: Task[]) => {
            const tareaAEliminar = tasks.find(task => task.text === nombreActividad);
            if (tareaAEliminar) {
                this.taskService.remove(tareaAEliminar.id).then(() => {
                    console.log('Tarea eliminada exitosamente de la gantt');
                }).catch(error => {
                    console.error('Error al eliminar tarea de la gantt:', error);
                });
            } else {
                console.error('No se encontró la tarea correspondiente en la gantt');
            }
        }).catch(error => {
            console.error('Error al obtener las tareas de la gantt:', error);
        });

        this.actividadesService.getActividad().subscribe((actividadesData: Actividades[]) => {
            this.actividadesService.emitActividadesChanged(actividadesData);
          }, error => {
            console.error('Error al obtener las actividades:', error);
        });
    }, error => {
        console.error('Error al eliminar la actividad:', error);
    });
}






  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (data: any) => {
        this.empleados = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de empleados:', error);
      }
    );
  }




}
