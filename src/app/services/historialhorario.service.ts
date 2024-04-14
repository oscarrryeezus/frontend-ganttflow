import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export class HistorialHorarioService{
    private URL = 'https://backend-ganttflow.up.railway.app/api'

    constructor(private http: HttpClient) {}

    getHitorialHorario () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearHistorialHorario(historialHorarioData: any): Observable<any>{
        return this.http.post(this.URL, historialHorarioData);
    }

    actulializarHistorialHorario(id: string, historialHorarioData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, historialHorarioData);
    }

    eliminarHistorialHorario(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }
}
