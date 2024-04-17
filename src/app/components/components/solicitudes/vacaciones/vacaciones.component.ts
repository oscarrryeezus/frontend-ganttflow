// Importaciones necesarias para el componente
// ActivatedRoute se utiliza para acceder a los parámetros de la URL.
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Contrato } from '../../../models/contrato'; // Importa el modelo Contrato
import { ContratoService } from '../../../services/contrato.service'; // Importa el servicio ContratoService
import { Empleado } from '../../../models/empleado'; // Importa el modelo Empleado
import { CookieService } from 'ngx-cookie-service'; // Importa el servicio CookieService
import { Router } from '@angular/router'; // Importa el servicio Router
import * as jwtDecode from 'jwt-decode'; // Importa la librería jwt-decode
import { SolicitudVacaciones } from '../../../models/solicitudVacaciones';
import { VacacionesService } from '../../../services/vacaciones.service'; // Importa el servicio VacacionesService
import { CorreoService } from '../../../services/correo.service'; // Importa el servicio CorreoService
import { AdministradorService } from '../../../services/administrador.service'; // Importa el servicio AdministradorService
import { Administrador } from '../../../models/administrador'; // Importa el modelo Administrador
import Swal from 'sweetalert2'; // Importa la librería SweetAlert2

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.component.html',
  styleUrl: './vacaciones.component.css'
})
export class VacacionesComponent implements OnInit{

  // Decorador ViewChild para obtener una referencia al elemento con el nombre 'alerta' en la plantilla HTML.
  @ViewChild('alerta') alertaElement: ElementRef | any;

  // Declaración de variables utilizadas en el componente
  empleados: any[] = [];
  empleado: Empleado | any = {};
  contratos: Contrato[] = [];
  contrato: Contrato | any = {};
  contratoSeleccionado: Contrato | any;
  solicitudVacaciones: SolicitudVacaciones | any = {};
  token: string | undefined;
  cookie: boolean | undefined;
  tokenDecodificado: any;
  periodoSeleccionado: any = {}
  periodoIncorrecto: boolean = false;
  admin: Administrador | any
  correoAdmin: string = ''
  mostrarSolicitud?: boolean = true
  solicitudCreada: Empleado | any

  // Constructor del componente, donde se inyectan los servicios necesarios
  constructor(
    private contratoService: ContratoService,
    private cookieService: CookieService,
    private router: Router,
    private solicitudVacacionesService: VacacionesService,
    private correoService: CorreoService,
    private adminServices: AdministradorService
  ) {}

  // Método ngOnInit que se ejecuta al inicializarse el componente
  ngOnInit(): void {
    // Obtención del token desde la cookie
    this.token = this.cookieService.get('token');
    this.cookie = this.cookieService.check('token');
    this.tokenDecodificado = jwtDecode.jwtDecode(this.token);

    // Obtención de contratos filtrados según el tipo de contrato del usuario
    this.contratoService.getContrato().subscribe((contratos: Contrato[]) => {
      this.contratos = contratos.filter(
        (contrato: Contrato) => contrato.TipoContrato === this.tokenDecodificado.Contrato
      );

    });

    // Llamada a métodos necesarios al inicializarse el componente
    this.obtenerContratos();
    this.prepararSolicitud()
    console.log(this.contrato)
    this.obtenerCorreoAdmin()
    this.existeSolicitud();
  }

  // Método para obtener los contratos
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

  // Método para preparar la solicitud de horario
  prepararSolicitud(){
    this.solicitudVacaciones.NombreEmpleado = this.tokenDecodificado.Nombre +' '+  this.tokenDecodificado.AppE + ' ' + this.tokenDecodificado.ApmE
    this.solicitudVacaciones.NombreAdmin = this.tokenDecodificado.NombreAdmin
    this.solicitudVacaciones.Contrato = this.tokenDecodificado.Contrato
    this.solicitudVacaciones.EstadoSolicitud = 'En Revision'
    this.solicitudVacaciones.Correo = this.tokenDecodificado.Correo
  }

  // Método para asignar un horario
  asignarVacaciones() {
    // Inicializa solicitudVacaciones si aún no está inicializado
    if (!this.solicitudVacaciones) {
        this.solicitudVacaciones = {};
    }

    // Asigna las fechas de inicio y fin del formulario a los datos de periodo de la solicitud
    this.solicitudVacaciones.Periodo = {
        inicio: this.solicitudVacaciones.inicio,
        fin: this.solicitudVacaciones.fin
    };
}




enviarSolicitud() {
  // Verifica que se hayan ingresado las fechas de inicio y fin
  if (!this.solicitudVacaciones.inicio || !this.solicitudVacaciones.fin) {
    // Muestra un mensaje de error si alguna de las fechas está faltante
    console.error('Falta ingresar la fecha de inicio o la fecha de fin');
    return;
  }

  // Llama al servicio correspondiente para obtener las solicitudes de vacaciones del empleado
  this.solicitudVacacionesService.obtenerSolicitudesEmpleado(this.tokenDecodificado.NombreEmpleado).subscribe((solicitudes: SolicitudVacaciones[]) => {
    // Verifica si alguna de las solicitudes está en revisión
    const tieneSolicitudEnRevision = solicitudes.some(solicitud => solicitud.EstadoSolicitud === 'En Revisión');

    if (tieneSolicitudEnRevision) {
      // Muestra un mensaje de error si el empleado tiene una solicitud de vacaciones en revisión
      console.error('Ya tienes una solicitud de vacaciones en revisión');
      return;
    }

    // Crea un objeto que contenga la solicitud de vacaciones con las fechas ingresadas por el usuario
    const solicitud = {
      NombreEmpleado: this.tokenDecodificado.Nombre +' '+  this.tokenDecodificado.AppE + ' ' + this.tokenDecodificado.ApmE,
      NombreAdmin: this.tokenDecodificado.NombreAdmin,
      Contrato: this.tokenDecodificado.Contrato,
      PeriodoSolicitado: {
        inicio: this.solicitudVacaciones.inicio,
        fin: this.solicitudVacaciones.fin
      },
      EstadoSolicitud: 'En Revisión',
      Correo: this.tokenDecodificado.Correo
    };

    // Llama al servicio correspondiente para enviar la solicitud utilizando el objeto creado
    this.solicitudVacacionesService.crearSolicitudVacaciones(solicitud).subscribe(() => {
      // Muestra una confirmación al usuario
      Swal.fire({
        title: 'Solicitud enviada!',
        text: 'Su solicitud de vacaciones ha sido enviada correctamente',
        icon: 'success',
        confirmButtonText: 'Entendido'
      });

      // Reinicia el formulario o limpia las fechas ingresadas por el usuario si es necesario
      this.solicitudVacaciones.nicio = null;
      this.solicitudVacaciones.fechaFin = null;

      // Puedes agregar cualquier otra lógica necesaria después de enviar la solicitud
    }, error => {
      // Maneja el error en caso de que ocurra
      console.error('Error al enviar la solicitud de vacaciones:', error);
      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al enviar la solicitud de vacaciones. Por favor, inténtelo de nuevo más tarde',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
  });
}




  existeSolicitud() {
    let nombre1: string = this.solicitudVacaciones.NombreEmpleado;

    this.solicitudVacacionesService.obtenerUnSolicitudVacaciones(nombre1).subscribe(data => {
      // Esta función se ejecutará cuando se complete la solicitud HTTP

      this.solicitudCreada = data; // Asigna los datos recibidos de la solicitud
      let nombre2: string = this.solicitudCreada.NombreEmpleado;

      if (nombre1 === nombre2) {
        this.solicitudVacaciones = this.solicitudCreada; // Asigna los datos de la solicitud creada a this.solicitud

        this.solicitudVacaciones = {
          NombreEmpleado: this.solicitudCreada.NombreEmpleado,
          NombreAdmin: this.solicitudCreada.NombreAdmin,
          Contrato: this.solicitudCreada.Contrato,
          PeriodoSolicitado: {
            inicio: this.solicitudCreada.PeriodoSolicitado.inicio,
            fin: this.solicitudCreada.PeriodoSolicitado.fin
          },
          EstadoSolicitud: this.solicitudCreada.EstadoSolicitud,
          Correo: this.solicitudCreada.Correo
        }

        this.mostrarSolicitud = false;
        console.log("La solicitud ya existe para este empleado", this.solicitudVacaciones);
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
    this.solicitudVacacionesService.eliminarSolicitudVacaciones(this.solicitudVacaciones.NombreEmpleado).subscribe(()=>{
      this.prepararSolicitud()
      this.mostrarSolicitud = true
    })
  }
}
