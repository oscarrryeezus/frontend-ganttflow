import { Component, OnInit } from '@angular/core';
import { Sede } from '../../models/sede';
import { SedeService } from '../../services/sede.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css'],
})
export class SedesComponent implements OnInit {
  sedes: Sede[] = [];
  sede: Sede | any = {}
  modoEdicion: boolean = false;
  token?: string;
  cookie?: boolean;
  tokenDecodificado: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;

  constructor(
    private sedeService: SedeService,
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

    this.cargarSedes();
  }

  cargarSedes(){
    this.sedeService.getSede().subscribe(sedesData =>{
      this.sedes = sedesData
    });
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.sede = {}
  }

  guardarSede() {
    if (!this.validarCampos()) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    if (this.modoEdicion) {
      const region: string = this.sede.region.valueOf();
      this.sedeService.actualizarSede(region, this.sede).subscribe(() => {
        this.cargarSedes();
        this.resetForm();
      });
    } else {
      this.sedeService.crearSede(this.sede).subscribe(() => {
        this.cargarSedes();
        this.resetForm();
      });
    }
  }

  validarCampos(): boolean {
    return (
      this.sede.region && // Verifica que la región no esté vacía
      this.sede.pais // Verifica que el nombre no esté vacío
    );
  }

  resetForm(){
    this.sede = {};
    this.modoEdicion = false
  }

  editarSede(sedeData: Sede){
    this.modoEdicion = true;
    this.sede = {
      ...sedeData
    }
    const formElement = document.querySelector('.form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  eliminarSede(id: string){
    this.sedeService.eliminarSede(id).subscribe(()=>{
      this.cargarSedes();
    })
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
