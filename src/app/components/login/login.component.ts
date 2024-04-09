// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { response } from 'express';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
      private authService: AuthService, 
      private router: Router,
      private cookieService: CookieService
    ) {}

  onSubmit(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.logIn(credentials).subscribe(
      (response) => { 
        this.cookieService.set('token',response.token)
        console.log(response)
        this.router.navigate(['inicio'])
      },
      (error) => {
        // Manejar errores, por ejemplo, mostrar un mensaje de error al usuario
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }


}

