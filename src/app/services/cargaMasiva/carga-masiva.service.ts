import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaMasivaService {

  private URL = 'http://localhost:3000/api/empleado';

  constructor(
    private http: HttpClient
  ) { }

  sendPost(formData: FormData): Observable<any> {
    return this.http.post(`${this.URL}/upload`, formData);
  }
}
