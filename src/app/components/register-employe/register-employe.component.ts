import { Contrato } from './../../models/contrato';
// register-employe.component.ts

import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { AdministradorService } from '../../services/administrador.service';
import { formatDate } from '@angular/common'; // Importa la función formatDate
import { ContratoService } from '../../services/contrato.service';
import { AreaService } from '../../services/area.service';
import { SedeService } from '../../services/sede.service';
import { CorreoService } from '../../services/correo.service';
import { CargaMasivaService } from '../../services/cargaMasiva/carga-masiva.service';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-register-employe',
  templateUrl: './register-employe.component.html',
  styleUrls: ['./register-employe.component.css'],
})
export class RegisterEmployeComponent implements OnInit {

  empleados: any[] = [];
  administradores: any[] = [];
  searchKeyword: string = '';
  mensaje: string = '';
  token?: string;
  cookie?: boolean;
  tokenDecodificado: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;

  empleado: Empleado = {
    Nombre: '',
    AppE: '',
    ApmE: '',
    FechaNac: new Date(),
    Correo: '',
    Contrasena: '',
    Region: '',
    AreaTrabajo: '',
    Departamento: '',
    Contrato: '',
    TurnoActual: {
      inicio: '',
      fin: '',
    },
    HorarioTraining: {
      Fecha: new Date(),
      HoraInicial: '',
      HoraFinal: '',
    },
    NombreAdmin: '',
    FechaDeIngreso: new Date()
  };

  edit: boolean = false;

  isEditRoute: boolean = false;
  areas: any[] = [];
  departamentos: any[] = [];
  contratos: any[] = [];
  sedes: any[] = [];
  turnos: any[] = []
  selectedContract: any
  horaInicio: string = '';
  horaFinal: string = '';






  constructor(
    private empleadoService: EmpleadoService,
    private departamentoService: DepartamentoService,
    private administradorService: AdministradorService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private contratoService: ContratoService,
    private areaService: AreaService,
    private sedeService: SedeService,
    private correoService: CorreoService,
    private cargaMasivaService: CargaMasivaService,
    private cookieService: CookieService
  ) { }

  asignarHorasTurno(turno: any) {
    this.horaInicio = turno.inicio; // asignar el valor de inicio del turno
    this.horaFinal = turno.fin;     // asignar el valor de fin del turno
  }

  cancelarEdicion() {
    this.empleado = {
      Nombre: '',
      AppE: '',
      ApmE: '',
      FechaNac: new Date(),
      Correo: '',
      Contrasena: '',
      Region: '',
      AreaTrabajo: '',
      Departamento: '',
      Contrato: '',
      TurnoActual: {
        inicio: '',
        fin: '',
      },
      HorarioTraining: {
        Fecha: new Date(),
        HoraInicial: '',
        HoraFinal: '',
      },
      NombreAdmin: '',
      FechaDeIngreso: new Date()
    };
    this.edit = false;
  }

  editarEmpleado(empleado: Empleado) {
    this.edit = true;
    this.empleado = { ...empleado };
  }

  resetForm() {
    this.empleado = {
      Nombre: '',
      AppE: '',
      ApmE: '',
      FechaNac: new Date(),
      Correo: '',
      Contrasena: '',
      Region: '',
      AreaTrabajo: '',
      Departamento: '',
      Contrato: '',
      TurnoActual: {
        inicio: '',
        fin: '',
      },
      HorarioTraining: {
        Fecha: new Date(),
        HoraInicial: '',
        HoraFinal: '',
      },
      NombreAdmin: '',
      FechaDeIngreso: new Date()
    };
    this.edit = false;
  }

  submitForm() {
    // Verificar si todas las propiedades requeridas están llenas
    console.log('Empleado antes de la validación:', this.empleado);

    if (
      this.empleado.Nombre &&
      this.empleado.AppE &&
      this.empleado.ApmE &&
      this.empleado.FechaNac &&
      this.empleado.Correo &&
      this.empleado.Region &&
      this.empleado.AreaTrabajo &&
      this.empleado.Departamento &&
      this.empleado.Contrato &&
      this.empleado.TurnoActual.inicio &&
      this.empleado.TurnoActual.fin &&
      this.empleado.HorarioTraining.Fecha &&
      this.empleado.HorarioTraining.HoraInicial &&
      this.empleado.HorarioTraining.HoraFinal &&
      this.empleado.NombreAdmin
    ) {
      // Convertir las fechas y horas a objetos Date
      this.empleado.FechaNac = new Date(this.empleado.FechaNac);
      this.empleado.HorarioTraining.Fecha = new Date(this.empleado.HorarioTraining.Fecha);

      const fechaInicio = new Date(this.empleado.TurnoActual.inicio);
      const fechaFin = new Date(this.empleado.TurnoActual.fin);

      // Función para formatear la fecha
      const formatearFecha = (fecha: Date): string => {
        return fecha.toLocaleString(); // Utiliza la configuración regional del usuario para formatear la fecha
      };

      if (fechaInicio >= fechaFin) {
        console.error('La hora de inicio del turno debe ser menor que la hora de fin.');
        return;
      }

      if (this.edit) {
        console.log(`Actualizando empleado: ${this.empleado.Nombre}`);

        // Convertir el correo a un string primitivo
        const correoString: string = this.empleado.Correo.valueOf();
        this.empleado.FechaNac = new Date(this.empleado.FechaNac);
        this.empleado.HorarioTraining.Fecha = new Date(this.empleado.HorarioTraining.Fecha);

        this.enviarNotificacion(
          'Cuenta como empleado modificada',
          'La cuenta para Gantt Flow ha sido modificada exitosamente.',
          correoString
        );

        this.empleadoService.actualizarEmpleado(correoString, this.empleado).subscribe(
          (response) => {
            console.log('Empleado actualizado exitosamente:', response);

            // Actualizar la lista de empleados después de la actualización
            this.getEmpleados();
            this.resetForm();
          },
          (error) => {
            console.error('Error al actualizar empleado:', error);
          }
        );
      } else {
        // Construir el mensaje con los horarios formateados
        const mensaje = `¡Holaaa! ${this.empleado.Nombre}, tu cuenta para Gantt Flow ha sido creada exitosamente.
                Su administrador será: ${this.empleado.NombreAdmin}.
                Su region será: ${this.empleado.Region}.
                Su horario será desde: ${formatearFecha(fechaInicio)} hasta: ${formatearFecha(fechaFin)}.`;
        console.log(mensaje);

        const correoString: string = this.empleado.Correo.valueOf();  // Agregué esto para que se pueda mandar correos
        // Imprimir el objeto empleado en la consola para verificar
        this.enviarNotificacion(
          'Cuenta como empleado creada',
          mensaje,
          correoString
        );

        console.log('Form submitted with:', this.empleado);
        this.getEmpleados();
        // Llamar al servicio para crear el empleado
        this.empleadoService.crearEmpleado(this.empleado).subscribe(
          (response) => {
            console.log('Empleado saved successfully:', response);
            // Limpiar el formulario
            this.empleado = {
              Nombre: '',
              AppE: '',
              ApmE: '',
              FechaNac: new Date(),
              Correo: '',
              Contrasena: '',
              Region: '',
              AreaTrabajo: '',
              Departamento: '',
              Contrato: '',
              TurnoActual: {
                inicio: '',
                fin: '',
              },
              HorarioTraining: {
                Fecha: new Date(),
                HoraInicial: '',
                HoraFinal: '',
              },
              NombreAdmin: '',
              FechaDeIngreso: new Date()
            };

            this.getEmpleados();
          },
          (error) => {
            console.error('Error saving empleado:', error);
          }
        );
      }
    } else {
      // Si alguna propiedad requerida está vacía, mostrar un mensaje de error o manejarlo según tus necesidades
      console.error('Error: Algunas propiedades requeridas están vacías.');
      console.log('Estado de las propiedades del empleado:');
      console.log('Nombre:', this.empleado.Nombre);
      console.log('AppE:', this.empleado.AppE);
      console.log('ApmE:', this.empleado.ApmE);
      console.log('HoraFinal:', this.empleado.TurnoActual.fin);
      console.log('HoraInicio:', this.empleado.TurnoActual.inicio);
    }
  }

  showFilters: boolean = true;
  showEmpleados: boolean = true;
  showForm: boolean = true;
  showCargaMasiva: boolean = true;

  isIconKeyboardmc: boolean = true;
  isIconKeyboard: boolean = true;
  isIconKeyboardf: boolean = true;
  isIconKeyboarde: boolean = true;

  toggleFilters() {
    this.showFilters = !this.showFilters;
    this.isIconKeyboard = !this.isIconKeyboard;
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.isIconKeyboardf = !this.isIconKeyboardf;
  }

  toggleCargaMasiva(){
    this.showCargaMasiva = !this.showCargaMasiva;
    this.isIconKeyboardmc = !this.isIconKeyboardmc; 
  }


  toggleEmpleados() {
    this.showEmpleados = !this.showEmpleados;
    this.isIconKeyboarde = !this.isIconKeyboarde;
  }




  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US').format(date);
  }

  private formatTime(time: Date): string {
    const options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(time);
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

  search() {
    if (this.searchKeyword.trim() !== '') {
      this.empleados = this.empleados.filter(empleado =>
        Object.values(empleado).some(value =>
          String(value).toLowerCase().includes(this.searchKeyword.toLowerCase())
        )
      );
    } else {
      this.getEmpleados();
    }
  }

  updateEmpleado(empleado: Empleado) {
    console.log(`Actualizando empleado: ${empleado.Nombre}`);

    // Convertir el correo a un string primitivo
    const correoString: string = empleado.Correo.valueOf();
    this.empleado.FechaNac = new Date(this.empleado.FechaNac);

    this.empleado.HorarioTraining.Fecha = new Date(this.empleado.HorarioTraining.Fecha);

    this.enviarNotificacion( //aquie cuando se modifique
      'Cuenta como empleado modificada',
      'La cuenta para Gantt Flow ha sido modificada exitosamente.',
      correoString);
    this.empleadoService.actualizarEmpleado(correoString, empleado).subscribe(
      (response) => {
        console.log('Empleado actualizado exitosamente:', response);


        // Actualizar la lista de empleados después de la actualización
        this.getEmpleados();
        this.resetForm();

      },
      (error) => {
        console.error('Error al actualizar empleado:', error);
      }
    );
  }


  deleteEmpleado(empleado: any) {
    console.log(`Eliminar empleado: ${empleado.Nombre}`);
    const correoString: string = empleado.Correo.valueOf();
    this.enviarNotificacion( //aquie cuando se modifique
      'Cuenta como empleado ELIMINDADA',
      `Estimado/a ${empleado.Nombre}, Nos dirigimos a usted para informarle que la cuenta asociada a su perfil de empleado en Gantt Flow ha sido eliminada exitosamente. Agradecemos su colaboración y participación en nuestra plataforma hasta el momento. Si tiene alguna pregunta o necesita asistencia adicional, no dude en ponerse en contacto con nuestro equipo de soporte. Atentamente GanttFLow `,
      correoString);

    // Aquí debes llamar al método correspondiente en tu servicio para eliminar el empleado por correo
    this.empleadoService.eliminarEmpleado(empleado.Correo).subscribe(
      (response) => {
        console.log('Empleado eliminado exitosamente:', response);

        // Actualizar la lista de empleados después de la eliminación
        this.getEmpleados();
      },
      (error) => {
        console.error('Error al eliminar empleado:', error);
      }
    );
  }


  getDepartamentos() {
    this.departamentoService.getDepartamento().subscribe(
      (data: any) => {
        this.departamentos = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de departamentos:', error);
      }
    );
  }


  getAdministradores() {
    this.administradorService.getAdministrador().subscribe(
      (data: any) => {
        this.administradores = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de administradores:', error);
      }
    );
  }

  getContratos() {
    this.contratoService.getContrato().subscribe((contratos: Contrato[]) => {
      this.contratos = contratos;

    });
  }

  onContractChange() {
    this.selectedContract = this.contratos.find(contrato => contrato.TipoContrato === this.empleado.Contrato);
    console.log('Selected Contract:', this.selectedContract);

    // Si se ha seleccionado un contrato y el contrato tiene turnos asociados
    if (this.selectedContract && this.selectedContract.TurnosContrato && this.selectedContract.TurnosContrato.length > 0) {
      // Obtener el primer turno del contrato
      const primerTurno = this.selectedContract.TurnosContrato[0];
      console.log('Turno:', primerTurno);

      // Asignar los valores del primer turno a las propiedades HoraInicio y HoraFinal del empleado
      this.empleado.TurnoActual = {
        inicio: primerTurno.inicio,
        fin: primerTurno.fin
      };

      console.log('HoraInicio:', this.empleado.TurnoActual.inicio);
      console.log('HoraFinal:', this.empleado.TurnoActual.fin);

      // Volver a inicializar el componente para reflejar los cambios en la interfaz de usuario
      this.ngOnInit();
    }
  }


  getAreas() {
    this.areaService.getArea().subscribe(
      (data: any) => {
        this.areas = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de areas:', error);
      }
    );
  }

  getSedes() {
    this.sedeService.getSede().subscribe(
      (data: any) => {
        this.sedes = data;
      },
      (error: any) => {
        console.error('Error al obtener la lista de sedes:', error);
      }
    );
  }


  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedArea: string = '';
  selectedContrato: string = '';
  selectedSede: string = '';


  get filteredEmpleados(): Empleado[] {
    return this.empleados.filter(empleado =>
      (empleado.Nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) || this.searchTerm === '') &&
      (this.selectedDepartment === '' || empleado.Departamento === this.selectedDepartment) &&
      (this.selectedArea === '' || empleado.AreaTrabajo === this.selectedArea) &&
      (this.selectedContrato === '' || empleado.Contrato === this.selectedContrato) &&
      (this.selectedSede === '' || empleado.Sede === this.selectedSede)
    );
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.selectedArea = '';
    this.selectedContrato = '';
  }

  ngOnInit(): void {
    this.token = this.cookieService.get('token');
    this.cookie = this.cookieService.check('token');

    if (!this.cookie || !this.token) {
      this.router.navigate(['login']);
      this.navbarLogin = true;
      return;
    }

    this.tokenDecodificado = jwtDecode.jwtDecode(this.token);

    this.determinarBarraDeNavegacion();

    this.getEmpleados();
    this.getDepartamentos();
    this.getAdministradores();
    this.getContratos();
    this.getAreas();
    this.getSedes();
  }


  //loquelemovi jaja sludossadIUGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG











  jsonData: any; // Variable para almacenar la información del archivo JSON

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const fileContent: string = e.target.result;
      this.jsonData = JSON.parse(fileContent);
      console.log('Archivo JSON cargado:', this.jsonData);
    };

    reader.readAsText(file);
  }

  enviarDatosJsonAlServidor() {
    if (this.jsonData) {
      // Convertir fechas de cadena a objetos de fecha
      this.jsonData.forEach((empleado: any) => {
        empleado.FechaDeIngreso = new Date(empleado.FechaDeIngreso);
        empleado.HorarioTraining.Fecha = new Date(empleado.HorarioTraining.Fecha);
      });

      this.empleadoService.crearMultiplesEmpleados(this.jsonData).subscribe(
        response => {
          console.log('Datos enviados correctamente:', response);
          this.getEmpleados()
        },
        error => {
          console.error('Error al enviar los datos:', error);
        }
      );
    } else {
      console.error('No hay datos JSON para enviar.');
    }
  }













  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const contents = e.target.result;
      // Aquí puedes procesar el contenido del archivo según sea necesario
      console.log(contents);
    };
    reader.readAsText(file);
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

  //navbar


  determinarBarraDeNavegacion(): void {
    switch (this.tokenDecodificado.Role) {
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

}
