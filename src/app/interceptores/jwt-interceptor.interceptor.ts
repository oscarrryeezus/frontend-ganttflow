import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';
import { Router } from 'express';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token:string = this.cookieService.get('token');
    let req = request;
    if(Token){
      req = request.clone({
        setHeaders:{
          Autorizacion: `Bearer ${token}`
        }
      })
    }
    return next.handle(req);
  }
}
