import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class SolicitudhorarioService {

  constructor(private http: HttpClient) { }

  private URL = 'http://localhost:3000/api/horario'

  getSolicitudHorario(): Observable<any>{
    return this.http.get(this.URL)
  }

  crearSolicitudHorario(solicitudHorarioData: any): Observable<any>{
    return this.http.post(this.URL, solicitudHorarioData)
  }

  actualizarSolicitudHorario(id: string, solicitudHorarioData: any): Observable<any>{
    return  this.http.put(`${this.URL}/${id}`, solicitudHorarioData)
  }

  eliminarSolicitudHorario(id: string): Observable<any>{
    return this.http.delete(`${this.URL}/${id}`)
  }

  obtenerUnSolicitudHorario(id: string): Observable<any>{
    return this.http.get(`${this.URL}/${id}`)
  }

  obtenerSolicitudesAdmin(id:string){
    return this.http.get(`${this.URL}/poradmin/${id}`)
  }

}
