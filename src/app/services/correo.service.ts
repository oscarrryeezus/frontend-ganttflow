import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {

  private URL = 'https://backend-ganttflow.up.railway.app/api/envio'; // URL del servicio de envío de correo

  constructor(private http: HttpClient) { }

  envioCorreo(correoData: {}): Observable<any> {
    return this.http.post(this.URL, correoData).pipe(
      catchError(error => {
        // Manejar errores de envío de correo electrónico
        console.error('Error al enviar correo electrónico:', error);
        return throwError(error); // Reenviar el error para que el componente que llama pueda manejarlo
      })
    );
  }
}
