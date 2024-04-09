import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class VacacionesService{
    private URL = 'http://localhost:3000/api/vacaciones'

    constructor(private http: HttpClient) {}

    getVacaciones(): Observable<any>{
        return this.http.get(this.URL)
      }
    
      crearSolicitudVacaciones(solicitudVacacionesData: any): Observable<any>{
        return this.http.post(this.URL, solicitudVacacionesData)
      }
    
      actualizarSolicitudVacaciones(id: string, solicitudVacacionesData: any): Observable<any>{
        return  this.http.put(`${this.URL}/${id}`, solicitudVacacionesData)
      }
    
      eliminarSolicitudVacaciones(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`)
      }
    
      obtenerUnSolicitudVacaciones(id: string): Observable<any>{
        return this.http.get(`${this.URL}/${id}`)
      }
    
      obtenerSolicitudesAdmin(id:string){
        return this.http.get(`${this.URL}/poradmin/${id}`)
      }

      obtenerSolicitudesEmpleado(NombreEmpleado: string): Observable<any> {
        return this.http.get(`${this.URL}/porempleado/${NombreEmpleado}`);
      }
    }
    