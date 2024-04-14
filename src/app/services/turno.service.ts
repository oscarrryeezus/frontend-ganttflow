import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TurnoService{
    private URL = 'backend-ganttflow.up.railway.app/api'

    constructor(private http: HttpClient) {}

    getTurno () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearTurno(turnoData: any): Observable<any>{
        return this.http.post(this.URL, turnoData);
    }

    actulializarTurno(id: string, turnoData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, turnoData);
    }

    eliminarTurno(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }
}
