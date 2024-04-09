import { Component, HostBinding, OnInit } from '@angular/core';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/area';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrl: './area.component.css'
})
export class AreaComponent implements OnInit{
  
  areas: Area[]= []
  area: Area | any = {}
  modoEdicion: boolean = false;
  nombreAreaBusqueda: string = ''

  constructor(
    private areaService : AreaService, 
    private router:Router,
    private activateRoute:ActivatedRoute,
    private cookieService: CookieService
  ){
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

    this.cargarAreas();
  }

  cargarAreas(){
    this.areaService.getArea().subscribe(areasss =>{
      this.areas = areasss
    })
  }

  guardarArea(){
    if(this.modoEdicion){
      //actulizacion
      const NombreArea : string = this.area.NombreArea.valueOf();

      this.areaService.actualizarArea(NombreArea, this.area).subscribe(()=>{
        this.cargarAreas();
        this.resetForm();
      })
    } else {
      this.areaService.crearArea(this.area).subscribe(()=>{
        this.cargarAreas();
        this.resetForm();
      })
    }
  }

  editarArea(areass: Area){
    this.modoEdicion = true;
    this.area = {
      ...areass
    }
    const formElement = document.querySelector('.form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  eliminarArea(NombreArea: string){
    this.areaService.eliminarArea(NombreArea).subscribe(()=>{this.cargarAreas()});
  }

  resetForm(){
    this.area = {};
    this.modoEdicion = false;
  }

  buscarArea(){
    if(this.nombreAreaBusqueda.trim() !== ''){
      this.areaService.getAreaById(this.nombreAreaBusqueda).subscribe((data:any)=>{
        this.areas = [data];
      });
    }else{
      this.cargarAreas();
    }
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.area = {}
  }

  //barras de navegacion

  token?: string;
  cookie?: boolean;
  tokenDecodificado: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;


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

