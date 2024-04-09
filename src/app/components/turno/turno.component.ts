import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
//solicitud
import { SolicitudHorario } from '../../models/solicitudHorario';
import { SolicitudhorarioService } from '../../services/solicitudhorario.service';
import { Administrador } from '../../models/administrador';
import * as jwtDecode from 'jwt-decode';
import { CorreoService } from '../../services/correo.service';
import { Contrato } from '../../models/contrato';

//empleado
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent implements OnInit {

  //VARIABLES
  token: string | undefined;
  cookie: boolean | undefined;
  tokenDecodificado: any;

  
  solicitudesPendientes: SolicitudHorario[] = [];
  solicitudesRevisadas: SolicitudHorario[] = [];
  empleado: Empleado | any = {}
  correoEmpleado: string = ''

  solicitud: SolicitudHorario | any = {}

  constructor(
    private cookieService: CookieService,
    private solicitudHorarioService: SolicitudhorarioService,
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
    this.solicitudHorarioService.obtenerSolicitudesAdmin(this.tokenDecodificado.NombreAdmin).subscribe((data: SolicitudHorario[] | any) => {
      this.solicitudesRevisadas = data.filter((solicitud: SolicitudHorario) => solicitud.EstadoSolicitud === 'Aceptada' || solicitud.EstadoSolicitud === 'Rechazada');
    
      this.solicitudesPendientes = data.filter((solicitud: SolicitudHorario) => solicitud.EstadoSolicitud === 'En Revision');
    });
  }


  aceptarSolicitud(soli: any): void {
    this.solicitudHorarioService.actualizarSolicitudHorario(soli.NombreEmpleado, { EstadoSolicitud: 'Aceptada' }).subscribe(() => {
      const correo: string = soli.Correo;
      this.enviarNotificacion(
        "Solicitud de horario aceptada",
        `Su solicitud de cambio de horario ha sido aceptada. Por favor, revise los detalles en su cuenta. Su nuevo horario es de ${soli.TurnoSolicitado.inicio.toString()} a ${soli.TurnoSolicitado.fin.toString()}`,
        correo
      );
      this.empleadoService.getEmpleadoByCorreo(correo).subscribe((empleao: Empleado) => {
        this.empleadoService.actulizarEmpleadoPorEmail(correo, {
          ...empleao, 
          TurnoActual: {
            inicio: soli.TurnoSolicitado.inicio.toString(),
            fin: soli.TurnoSolicitado.fin.toString() 
          }
        }).subscribe(() => {
          console.log("¡El turno del empleado ha sido actualizado correctamente!");
        });
      });
      this.obtenerSolicitudes();
    });
  }
  

  rechazarSolicitud(id: string): void {
    this.solicitudHorarioService.actualizarSolicitudHorario(id, { EstadoSolicitud: 'Rechazada' }).subscribe(() => {
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
