import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private URL = 'https://backend-ganttflow.up.railway.app/api/empleado'; // Updated URL

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get(this.URL);
  }

  verificarCorreoExistente(correo: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.URL}/exists/${correo}`);
  }

  getEmpleadoByCorreo(correo: string): Observable<any> {
    return this.http.get(`${this.URL}/${correo}`);
  }

  crearEmpleado(empleadoData: any): Observable<any> {
    return this.http.post(this.URL, empleadoData);
  }

  actualizarEmpleado(correo: string, empleadoData: any): Observable<any> {
    return this.http.put(`${this.URL}/${correo}`, empleadoData);
  }

  eliminarEmpleado(correo: string): Observable<any> {
    return this.http.delete(`${this.URL}/${correo}`);
  }

  actulizarEmpleadoPorEmail(correo: string, empleado: any): Observable<any>{
    return this.http.put(`${this.URL}/actualizarHorario/${correo}`, empleado);
  }

  crearMultiplesEmpleados(datosEmpleados: any[]): Observable<any> {
    return this.http.post(`${this.URL}/multiples`, datosEmpleados);
  }

}
