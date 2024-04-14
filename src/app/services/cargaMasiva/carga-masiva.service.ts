import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaMasivaService {

  private URL = 'https://backend-ganttflow.up.railway.app/api/empleado';

  constructor(
    private http: HttpClient
  ) { }

  sendPost(formData: FormData): Observable<any> {
    return this.http.post(`${this.URL}/upload`, formData);
  }
}
