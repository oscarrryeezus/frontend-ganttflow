import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-gantt-admin',
  templateUrl: './gantt-admin.component.html',
  styleUrl: './gantt-admin.component.css'
})
export class GanttAdminComponent implements OnInit {
  token?: string;
  cookie?: boolean;
  tokenDecodificado: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

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
  }

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