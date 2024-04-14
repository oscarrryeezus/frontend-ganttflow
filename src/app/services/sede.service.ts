import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SedeService{

    private URL = 'backend-ganttflow.up.railway.app/api/sedes'

    constructor(private http: HttpClient) {}

    getSede () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearSede(sedeData: any): Observable<any>{
        return this.http.post(this.URL, sedeData);
    }

    actualizarSede(id: string, sedeData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, sedeData);
    }

    eliminarSede(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }

    obtenerUnSede(id: string): Observable<any> {
        return this.http.get(`${this.URL}/${id}`);
    }
}
