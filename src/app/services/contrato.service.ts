import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContratoService{

    private URL = 'https://backend-ganttflow.up.railway.app/api/contrato'

    constructor(private http: HttpClient) {}

    getContrato () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearContrato(contratoData: any): Observable<any>{
        return this.http.post(this.URL, contratoData);
    }

    actualizarContrato(id: string, contratoData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, contratoData);
    }

    eliminarContrato(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }

    obtenerUnContrato(id: string): Observable<any> {
        return this.http.get(`${this.URL}/${id}`);
    }
}

