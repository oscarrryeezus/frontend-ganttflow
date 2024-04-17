import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../../services/contrato.service';
import { Contrato } from '../../models/contrato';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-crud-contrato',
  templateUrl: './crud-contrato.component.html',
  styleUrls: ['./crud-contrato.component.css']
})
export class CrudContratoComponent implements OnInit {
  contratos: Contrato[] = [];
  contrato: Contrato | any= {};
  modoEdicion: boolean = false;
  tipoContratoBusqueda: string = '';
  token?: string;
  cookie?: boolean;
  tokenDecodificado: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;

  constructor(private contratoService: ContratoService,
    private cookieService: CookieService,
    private router: Router
  ) { }

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

    this.cargarContratos();
  }

  cargarContratos() {
    this.contratoService.getContrato().subscribe((contratos: Contrato[]) => {
      this.contratos = contratos;
    });
  }

  guardarContrato() {
    // Validación de los días trabajados y descansados
    if (this.contrato.DiasTrabajados < 0 || this.contrato.DiasTrabajados > 7) {
      alert('Los días trabajados deben estar entre 0 y 7.');
      return;
    }

    if (this.contrato.DiasDescansados < 0 || this.contrato.DiasDescansados > 7) {
      alert('Los días descansados deben estar entre 0 y 7.');
      return;
    }

    // Validación de los turnos
    for (let i = 0; i < this.contrato.TurnosContrato.length; i++) {
      const turno = this.contrato.TurnosContrato[i];
      const inicioTurno = turno.inicio; // Mantener como cadena
      const finTurno = turno.fin; // Mantener como cadena

      if (inicioTurno >= finTurno) {
        alert(`El turno ${i + 1} tiene una hora de inicio posterior o igual a la hora de fin.`);
        return;
      }
    }

    // Si pasa todas las validaciones, proceder con el guardado del contrato
    if (this.modoEdicion) {
      const tipoContrato: string = this.contrato.TipoContrato.valueOf();
      this.contratoService.actualizarContrato(tipoContrato, this.contrato).subscribe(() => {
        this.resetForm();
        this.cargarContratos();
      });
    } else {
      this.contratoService.crearContrato(this.contrato).subscribe(() => {
        this.resetForm();
        this.cargarContratos();
      });
    }
  }

  agregarTurno() {
    if (!this.contrato.TurnosContrato) {
      this.contrato.TurnosContrato = [];
    }
    this.contrato.TurnosContrato.push({ inicio: '', fin: '' });
  }

  borrarTurno(index: number) {
    this.contrato.TurnosContrato.splice(index, 1);
  }

  editarContrato(contrato: Contrato) {
    this.modoEdicion = true;
    this.contrato = { ...contrato };
  }

  eliminarContrato(id: string) {
    this.contratoService.eliminarContrato(id).subscribe(() => {
      this.cargarContratos();
    });
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.contrato = {}
  }

  resetForm() {
    this.contrato = {};
    this.modoEdicion = false;
  }

  buscarContrato(): void {
    if (this.tipoContratoBusqueda.trim() !== '') {
      this.contratoService.obtenerUnContrato(this.tipoContratoBusqueda).subscribe((data: any) => {
        this.contratos = [data];
      });
    } else {
      this.cargarContratos();
    }
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
