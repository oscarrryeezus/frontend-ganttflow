import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuardia implements CanActivate {
  
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token: string = this.cookieService.get('token');
    const cookie = this.cookieService.check('token');

    if (!cookie) {
      // Redirigir al usuario a la página de inicio de sesión si no hay token en las cookies
      return this.router.createUrlTree(['/inicio']);
    }

    try {
      const tokenDecodificado: any = jwtDecode.jwtDecode(token);

      // Verificar si el usuario tiene el rol de Administrador o Superadministrador
      if (tokenDecodificado && (tokenDecodificado.Role === 'Administrador' || tokenDecodificado.Role === 'Superadministrador')) {
        console.log(tokenDecodificado);
        return true;
      } else {
        // Redirigir al usuario a la página de inicio de sesión si no tiene los permisos adecuados
        return this.router.createUrlTree(['/inicio']);
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      // Redirigir al usuario a la página de inicio de sesión si hay un error al decodificar el token
      return this.router.createUrlTree(['/inicio']);
    }
  }
}
