import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SuperAdministradorGuardia implements CanActivate {
  
  constructor(private router: Router, private cookieService: CookieService ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token: string = this.cookieService.get('token')
    const cookie = this.cookieService.check('token')

    if (!cookie) {
      return this.router.createUrlTree(['/inicio']);
    }

    try {
      const tokenDecodificado: any = jwtDecode.jwtDecode(token);

      if (tokenDecodificado && (tokenDecodificado.Role === 'Superadministrador')) {
        console.log(tokenDecodificado);
        return true;
      } else {
        return this.router.createUrlTree(['/inicio']);
      }
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return this.router.createUrlTree(['/inicio']);
    }
  }
}
