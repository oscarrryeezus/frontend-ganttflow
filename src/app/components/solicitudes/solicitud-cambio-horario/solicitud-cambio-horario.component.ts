import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Contrato } from '../../../models/contrato';
import { ContratoService } from '../../../services/contrato.service';
import { Empleado } from '../../../models/empleado';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import { SolicitudHorario } from '../../../models/solicitudHorario';
import { SolicitudhorarioService } from '../../../services/solicitudhorario.service';
import { CorreoService } from '../../../services/correo.service';
import { AdministradorService } from '../../../services/administrador.service';
import { Administrador } from '../../../models/administrador';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitud-cambio-horario',
  templateUrl: './solicitud-cambio-horario.component.html',
  styleUrls: ['./solicitud-cambio-horario.component.css']
})
export class SolicitudCambioHorarioComponent implements OnInit {

  @ViewChild('alerta') alertaElement: ElementRef | any;

  empleados: any[] = [];
  empleado: Empleado | any = {};
  contratos: Contrato[] = [];
  contrato: Contrato | any = {};
  contratoSeleccionado: Contrato | any;
  solicitud: SolicitudHorario | any = {}
  token: string | undefined;
  cookie: boolean | undefined;
  tokenDecodificado: any;
  turnoSeleccionado: any = {}
  horarioIncorrecto: boolean = false;
  admin: Administrador | any
  correoAdmin: string = ''
  mostrarSolicitud?: boolean = true
  solicitudCreada: Empleado | any 

  constructor(
    private contratoService: ContratoService,
    private cookieService: CookieService,
    private router: Router,
    private solicitudHorarioService: SolicitudhorarioService,
    private correoService: CorreoService,
    private adminServices: AdministradorService
  ) {}

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.cookie = this.cookieService.check('token');
    this.tokenDecodificado = jwtDecode.jwtDecode(this.token);


    this.contratoService.getContrato().subscribe((contratos: Contrato[]) => {
      this.contratos = contratos.filter(
        (contrato: Contrato) => contrato.TipoContrato === this.tokenDecodificado.Contrato
      );
      
    });
    this.obtenerContratos();
    this.prepararSolicitud()
    console.log(this.contrato)
    this.obtenerCorreoAdmin()
    this.existeSolicitud();
  }

  obtenerContratos() {
    this.contratoService.getContrato().subscribe(
      (data) => {
        this.contratos = data;
        
        this.contratos = data.filter(
          (contrato: Contrato) => contrato.TipoContrato === this.tokenDecodificado.Contrato
        );
        this.contratoSeleccionado = this.contratos[0];
      },
      (error) => {
        console.error('Error al obtener los contratos:', error);
      }
    );
  }

  prepararSolicitud(){
    this.solicitud.NombreEmpleado = this.tokenDecodificado.Nombre +' '+  this.tokenDecodificado.AppE + ' ' + this.tokenDecodificado.ApmE
    this.solicitud.NombreAdmin = this.tokenDecodificado.NombreAdmin
    this.solicitud.Contrato = this.tokenDecodificado.Contrato
    this.solicitud.EstadoSolicitud = 'En Revision'
    this.solicitud.Correo = this.tokenDecodificado.Correo
  }

  asignarHorario() {
    if (
      this.turnoSeleccionado.inicio === this.tokenDecodificado.TurnoActual.inicio &&
      this.turnoSeleccionado.fin === this.tokenDecodificado.TurnoActual.fin 
    ) {
      Swal.fire({
        title: 'Horario invalido :(!',
        text: 'Elija un horario diferente',
        icon: 'error',
        confirmButtonText: 'Comprendo',
        timer: 5000,
      });
  
      return;
    }
  
    // Inicializa this.solicitud.Turno si aún no está inicializado
    if (!this.solicitud.Turno) {
      this.solicitud.Turno = {};
    }
  
    // Asigna los valores de inicio y fin
    this.solicitud.Turno.inicio = this.turnoSeleccionado.inicio.toString();
    this.solicitud.Turno.fin = this.turnoSeleccionado.fin.toString();
  
    this.horarioIncorrecto = false;
  }



  enviarSolicitud() {
   
    this.solicitudHorarioService.crearSolicitudHorario(
      this.solicitud = {
          NombreEmpleado: this.tokenDecodificado.Nombre +' '+  this.tokenDecodificado.AppE + ' ' + this.tokenDecodificado.ApmE,
          NombreAdmin: this.tokenDecodificado.NombreAdmin,
          Contrato: this.tokenDecodificado.Contrato,
          TurnoSolicitado: {
            inicio: this.turnoSeleccionado.inicio.toString(),
            fin: this.turnoSeleccionado.fin.toString()
          },
          EstadoSolicitud: 'En Revision',
          Correo: this.tokenDecodificado.Correo
    }).subscribe(()=>{

      this.mostrarSolicitud = false

      Swal.fire({
        title: 'Horario solicitado!',
        text: 'Su administrador fue informado',
        icon: 'success',
        confirmButtonText: 'Comprendo'
      })

      this.enviarNotificacion(
        'SOLICITUD RECIBIDA',
        'holoooooo ya nos llego tu notificacion en un rato lo vemos',
        this.tokenDecodificado.Correo
      )

      const correo: string = this.admin.CorreoAdmin.valueOf();
      this.enviarNotificacion(
        'SOLICITUD RECIBIDA',
        `hOLOOOOOOO ${this.tokenDecodificado.Nombre} pidio un cammbio en su fokin horario`,
        correo
      )
    });
    // Recargar la página después de 3 segundos
    setTimeout(() => {
      location.reload();
    }, 1000);

  }


  existeSolicitud() {
    let nombre1: string = this.solicitud.NombreEmpleado;
  
    this.solicitudHorarioService.obtenerUnSolicitudHorario(nombre1).subscribe(data => {
      // Esta función se ejecutará cuando se complete la solicitud HTTP
  
      this.solicitudCreada = data; // Asigna los datos recibidos de la solicitud
      let nombre2: string = this.solicitudCreada.NombreEmpleado;
  
      if (nombre1 === nombre2) {
        this.solicitud = this.solicitudCreada; // Asigna los datos de la solicitud creada a this.solicitud

        this.solicitud = {
          NombreEmpleado: this.solicitudCreada.NombreEmpleado,
          NombreAdmin: this.solicitudCreada.NombreAdmin,
          Contrato: this.solicitudCreada.Contrato,
          TurnoSolicitado: {
            inicio: this.solicitudCreada.TurnoSolicitado.inicio,
            fin: this.solicitudCreada.TurnoSolicitado.fin
          },
          EstadoSolicitud: this.solicitudCreada.EstadoSolicitud,
          Correo: this.solicitudCreada.Correo
        }

        this.mostrarSolicitud = false;
        console.log("La solicitud ya existe para este empleado", this.solicitud);
      }
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
      },
      error => {
        console.error('Error al enviar el correo:', error);
        }
    );
  }

  obtenerCorreoAdmin(){
    if (this.tokenDecodificado.NombreAdmin.trim() !== '') {
      this.adminServices.obtenerUnAdministrador(this.tokenDecodificado.NombreAdmin).subscribe((data: any) => {
        this.admin = data;
        console.log(this.admin)
        this.correoAdmin = this.admin.correoAdmin
      });
    }
  }

  borrarSolicitud(){
    this.solicitudHorarioService.eliminarSolicitudHorario(this.solicitud.NombreEmpleado).subscribe(()=>{
      this.prepararSolicitud()
      this.mostrarSolicitud = true
    })
  }
}
