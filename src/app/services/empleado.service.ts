import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


export class EmpleadoService{

  private URL = 'http://localhost:3000/api'

  constructor (private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get(this.URL);
  }

  getEmpleadoById(id: string): Observable<any> {
    return this.http.get(`${this.URL}/${id}`);
  }

  crearEmpleado(empleadoData: any): Observable<any> {
    return this.http.post(this.URL, empleadoData);
  }

  actualizarEmpleado(id: string, empleadoData: any): Observable<any> {
    return this.http.put(`${this.URL}/${id}`, empleadoData);
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.URL}/${id}`);
  }

}
