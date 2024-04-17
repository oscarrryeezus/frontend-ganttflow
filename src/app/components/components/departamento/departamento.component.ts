import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/departamento';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {
  departamentos: Departamento[] = [];
  edit: boolean = false;
  departamentoForm = this.fb.group({
    NombreDepartamento: [''],
    Numero: [''],
    Calle: [''], 
    Colonia: [''], 
    Cp: ['']
  });
  nombreBusqueda: any;
  token?: string;
  cookie?: boolean;
  tokenDecodificado: any;
  navBarAdmin: boolean = false;
  navBarEmpleado: boolean = false;
  navBarSuper: boolean = false;
  navbarLogin: boolean = true;

  constructor(private departamentoService: DepartamentoService, private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router) {}

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


    this.cargarDepartamentos();
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
  
  buscarDepartamentos(): void {
    if (this.nombreBusqueda.trim() !== '') {
      this.departamentoService.obtenerUnDepartamento(this.nombreBusqueda).subscribe((data: Departamento) => {
        this.departamentos = [data]; // Aquí se asigna el objeto de tipo Departamento a un array
      });
    } else {
      this.cargarDepartamentos();
    }
  }

  cargarDepartamentos() {
    this.departamentoService.getDepartamento().subscribe((departamentosData: Departamento[]) => {
      this.departamentos = departamentosData;
    });
  }

  guardarDepartamento() {
    // Verificar si los campos están llenos
    if (this.departamentoForm.get('NombreDepartamento')?.value &&
        this.departamentoForm.get('Calle')?.value &&
        this.departamentoForm.get('Numero')?.value &&
        this.departamentoForm.get('Colonia')?.value &&
        this.departamentoForm.get('Cp')?.value) {

        if (this.edit) {
            let departamentoActualizado = {
                //"NombreDepartamento": this.departamentoForm.get('NombreDepartamento')?.value,
                "Direccion": {
                    "Calle": this.departamentoForm.get('Calle')?.value,
                    "Numero": this.departamentoForm.get('Numero')?.value,
                    "Colonia": this.departamentoForm.get('Colonia')?.value,
                    "Cp": this.departamentoForm.get('Cp')?.value,
                }
            };

            this.departamentoService.actualizarDepartamento(this.departamentos[0].NombreDepartamento, departamentoActualizado).subscribe(() => {
                this.cargarDepartamentos();
                this.resetForm();
                console.log('Departamento Actualizado exitosamente');
            }, error => {
                console.error('Error al actualizar el departamento:', error);
            });
        } else {
            let depa = {
                "NombreDepartamento": this.departamentoForm.get('NombreDepartamento')?.value,
                "Direccion": {
                    "Calle": this.departamentoForm.get('Calle')?.value,
                    "Numero": this.departamentoForm.get('Numero')?.value,
                    "Colonia": this.departamentoForm.get('Colonia')?.value,
                    "Cp": this.departamentoForm.get('Cp')?.value,
                }
            };

            this.departamentoService.crearDepartamento(depa).subscribe(() => {
                this.cargarDepartamentos();
                this.resetForm();
                console.log('Departamento Creado exitosamente');
            }, error => {
                console.error('Error al crear el departamento:', error);
            });
        }
    } else {
        console.log('Por favor complete todos los campos antes de guardar.');
    }
}



  resetForm() {
    this.departamentoForm.reset();
    this.edit = false;
  }

  editarDepartamento(departamentoData: Departamento) {
    this.edit = true;
    if (departamentoData && departamentoData.NombreDepartamento) {
      this.departamentoForm.patchValue({
        NombreDepartamento: departamentoData.NombreDepartamento,
        Numero: departamentoData.Direccion.Numero,
        Calle: departamentoData.Direccion.Calle,
        Colonia: departamentoData.Direccion.Colonia,
        Cp: departamentoData.Direccion.Cp
      });
      console.log('Departamento Editado exitosamente');
    } else {
      console.error('Error al editar el departamento: departamentoData o departamentoData.NombreDepartamento es nulo o indefinido');
    }
  }

  eliminarDepartamento(NombreDepartamento: string) {
    this.departamentoService.eliminarDepartamento(NombreDepartamento).subscribe(() => {
      this.cargarDepartamentos();
      console.log('Departamento Eliminado exitosamente');
    }, error => {
      console.error('Error al eliminar el departamento:', error);
    });
  } 
}