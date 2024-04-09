import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
//solicitud
import { SolicitudVacaciones } from '../../models/solicitudVacaciones';
import { VacacionesService } from '../../services/vacaciones.service';
import { Administrador } from '../../models/administrador';
import * as jwtDecode from 'jwt-decode';
import { CorreoService } from '../../services/correo.service';
import { Contrato } from '../../models/contrato';

//empleado
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

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

  
  solicitudesPendientes: SolicitudVacaciones[] = [];
  solicitudesRevisadas: SolicitudVacaciones[] = [];
  empleado: Empleado | any = {}
  correoEmpleado: string = ''

  solicitud: SolicitudVacaciones | any = {}

  constructor(
    private cookieService: CookieService,
    private solicitudVacacionesService: VacacionesService,
    private correoService: CorreoService, 
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.cookie = this.cookieService.check('token');
    this.tokenDecodificado = jwtDecode.jwtDecode(this.token);

    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(): void {
    this.solicitudVacacionesService.obtenerSolicitudesAdmin(this.tokenDecodificado.NombreAdmin).subscribe((data: SolicitudVacaciones[] | any) => {
      this.solicitudesRevisadas = data.filter((solicitud: SolicitudVacaciones) => solicitud.EstadoSolicitud === 'Aceptada' || solicitud.EstadoSolicitud === 'Rechazada');
    
      this.solicitudesPendientes = data.filter((solicitud: SolicitudVacaciones) => solicitud.EstadoSolicitud === 'En Revisión');
    });
  }


  aceptarSolicitud(soli: any): void {
    this.solicitudVacacionesService.actualizarSolicitudVacaciones(soli.NombreEmpleado, { EstadoSolicitud: 'Aceptada' }).subscribe(() => {
      const correo: string = soli.Correo;
      this.enviarNotificacion(
        "Solicitud de vacaciones aceptada",
        `Su solicitud de vacaciones ha sido aceptada. Por favor, revise los detalles en su cuenta. Su perido de vacaciones es de ${soli.PeriodoSolicitado.inicio.toString()} a ${soli.PeriodoSolicitado.fin.toString()}`,
        correo
      );
      this.empleadoService.getEmpleadoByCorreo(correo).subscribe((empleao: Empleado) => {
        this.empleadoService.actulizarEmpleadoPorEmail(correo, {
          ...empleao, 
          PeriodoActual: {
            inicio: soli.PeriodoSolicitado.inicio.toString(),
            fin: soli.PeriodoSolicitado.fin.toString() 
          }
        }).subscribe(() => {
          console.log("¡El turno del empleado ha sido actualizado correctamente!");
        });
      });
      this.obtenerSolicitudes();
    });
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