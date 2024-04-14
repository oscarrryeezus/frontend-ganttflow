import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DepartamentoService {

    private URL = 'backend-ganttflow.up.railway.app/api/departamento';

    constructor(private http: HttpClient) {}

    getDepartamento(): Observable<any> {
        return this.http.get(this.URL);
    }

    crearDepartamento(departamentoData: any): Observable<any> {
        return this.http.post(this.URL, departamentoData);
    }

    actualizarDepartamento(NombreDepartamento: string, departamentoData: any): Observable<any> {
        return this.http.put(`${this.URL}/${NombreDepartamento}`, departamentoData);
    }

    eliminarDepartamento(id: string): Observable<any> {
        return this.http.delete(`${this.URL}/${id}`);
    }

    obtenerUnDepartamento(NombreDepartamento: string): Observable<any> {
        return this.http.get(`${this.URL}/${NombreDepartamento}`);
    }

}