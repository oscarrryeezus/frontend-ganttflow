import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Actividades } from '../models/actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private URL = 'backend-ganttflow.up.railway.app/api/actividades';

  actividadesChanged = new Subject<Actividades[]>();

  constructor(private http: HttpClient) {}


   emitActividadesChanged(actividades: Actividades[]) {
    this.actividadesChanged.next(actividades);
  }

  getActividad(): Observable<any> {
      return this.http.get(this.URL);
  }

  crearActividad(actividadData: any): Observable<any> {
      return this.http.post(this.URL, actividadData);
  }

  actualizarActividad(NombreActividad: string, actividadData: any): Observable<any> {
      return this.http.put(`${this.URL}/${NombreActividad}`, actividadData);
  }

  eliminarActividad(id: string): Observable<any> {
      return this.http.delete(`${this.URL}/${id}`);
  }

  obtenerUnaActividad(NombreActividad: string): Observable<any> {
      return this.http.get(`${this.URL}/${NombreActividad}`);
  }
}
