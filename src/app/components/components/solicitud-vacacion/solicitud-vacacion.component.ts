import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
//solicitud
import { SolicitudVacaciones } from '../../models/solicitudVacaciones';
import { VacacionesService } from '../../services/vacaciones.service';
import * as jwtDecode from 'jwt-decode';
import { CorreoService } from '../../services/correo.service';

//empleado
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/tasks';

@Component({
  selector: 'app-solicitud-vacacion',
  templateUrl: './solicitud-vacacion.component.html',
  styleUrls: ['./solicitud-vacacion.component.css']
})
export class SolicitudVacacionComponent implements OnInit{

  //VARIABLES
  token: string | undefined;
  cookie: boolean | undefined;
  tokenDecodificado: any;

  tokenn?: string;
  cookiee?: boolean;
  tokenDecodificadoo: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;


  solicitudesPendientes: SolicitudVacaciones[] = [];
  solicitudesRevisadas: SolicitudVacaciones[] = [];
  empleado: Empleado | any = {}
  correoEmpleado: string = ''
  private taskIdCounter: number = 1;

  solicitud: SolicitudVacaciones | any = {}

  constructor(
    private cookieService: CookieService,
    private solicitudVacacionesService: VacacionesService,
    private correoService: CorreoService,
    private empleadoService: EmpleadoService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tokenn = this.cookieService.get('token');
    this.cookiee = this.cookieService.check('token');

    if (!this.cookiee || !this.tokenn) {
      this.router.navigate(['login']);
      this.navbarLogin = true;
      return;
    }

    this.tokenDecodificadoo = jwtDecode.jwtDecode(this.tokenn);

    this.determinarBarraDeNavegacion();

    this.token = this.cookieService.get('token');
    this.cookie = this.cookieService.check('token');
    this.tokenDecodificado = jwtDecode.jwtDecode(this.token);

    this.obtenerSolicitudes();
  }

  determinarBarraDeNavegacion(): void {
    switch (this.tokenDecodificadoo.Role) {
      case 'Superadministrador':
        this.navBarSuper = true;
        break;
      case 'Administrador':
        this.navBarAdmin = true;
        break;
      case 'Empleado':
        this.navBarEmpleado = true;
        break;
    }
    this.navbarLogin = false;
  }


  obtenerSolicitudes(): void {
    this.solicitudVacacionesService.obtenerSolicitudesAdmin(this.tokenDecodificado.NombreAdmin).subscribe((data: SolicitudVacaciones[] | any) => {
      this.solicitudesRevisadas = data.filter((solicitud: SolicitudVacaciones) => solicitud.EstadoSolicitud === 'Aceptada' || solicitud.EstadoSolicitud === 'Rechazada');

      this.solicitudesPendientes = data.filter((solicitud: SolicitudVacaciones) => solicitud.EstadoSolicitud === 'En Revisión');
    });
  }


  aceptarSolicitud(soli: any): void {
    // Cálculo de la duración en días
    const fechaInicio = new Date(soli.PeriodoSolicitado.inicio);
    const fechaFin = new Date(soli.PeriodoSolicitado.fin);
    const duracionEnMilisegundos = fechaFin.getTime() - fechaInicio.getTime();
    const duracionEnDias = duracionEnMilisegundos / (1000 * 60 * 60 * 24);

    this.solicitudVacacionesService.actualizarSolicitudVacaciones(soli.NombreEmpleado, { EstadoSolicitud: 'Aceptada' }).subscribe(() => {
        const correo: string = soli.Correo;
        this.enviarNotificacion(
            "Solicitud de vacaciones aceptada",
            `Su solicitud de vacaciones ha sido aceptada. Por favor, revise los detalles en su cuenta. Su periodo de vacaciones es de ${soli.PeriodoSolicitado.inicio.toString()} a ${soli.PeriodoSolicitado.fin.toString()}`,
            correo
        );
        this.empleadoService.getEmpleadoByCorreo(correo).subscribe((empleado: Empleado) => {
            this.empleadoService.actulizarEmpleadoPorEmail(correo, {
                ...empleado,
                PeriodoActual: {
                    inicio: soli.PeriodoSolicitado.inicio.toString(),
                    fin: soli.PeriodoSolicitado.fin.toString()
                }
            }).subscribe(() => {
                console.log("¡El turno del empleado ha sido actualizado correctamente!");
            });

            const nuevaTarea: Task = {
              id: this.generateRandomId(), // Este será asignado automáticamente por el backend
              start_date: soli.PeriodoSolicitado.inicio,
              end_date: soli.PeriodoSolicitado.fin,
              text: `Vacaciones de ${soli.NombreEmpleado}`,
              progress: 0, // Puedes ajustar este valor según sea necesario
              duration: duracionEnDias, // Duración calculada en días
              empleado: soli.NombreEmpleado,
              parent: 0,
              departamento: '',
              contrato: '',
              sede: ''
            };

            // Insertar la nueva tarea utilizando el servicio TaskService
            this.taskService.insert(nuevaTarea)
                .then(() => {
                    console.log('La tarea se ha insertado correctamente.');
                })
                .catch(error => {
                    console.error('Error al insertar la tarea:', error);
                });
        });

        this.obtenerSolicitudes();
    });
}

generateRandomId(): number {
  // Generar un número aleatorio entre 1 y 1000000
  return Math.floor(Math.random() * 1000000) + 1;
}

  rechazarSolicitud(id: string): void {
    this.solicitudVacacionesService.actualizarSolicitudVacaciones(id, { EstadoSolicitud: 'Rechazada' }).subscribe(() => {
      this.obtenerSolicitudes();
    });
  }

  enviarNotificacion(asunto: string, mensaje: string, correo: string): void {
    const correoData = {
      asunto: asunto,
      mensaje: mensaje,
      correo: correo
    };

    this.correoService.envioCorreo(correoData).subscribe(
      () => {
        console.log('Correo enviado con éxito');
        console.log(correoData)
      },
      error => {
        console.error('Error al enviar el correo:', error);
        console.log(correoData)
        }
    );
}

}
