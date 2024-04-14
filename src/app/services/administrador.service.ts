import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdministradorService{

    private URL = 'https://backend-ganttflow.up.railway.app/api/administrador'

    constructor(private http: HttpClient) {}

    getAdministrador () : Observable<any>{
        return this.http.get(this.URL);
    }

    crearAdministrador(administradorData: any): Observable<any>{
        return this.http.post(this.URL, administradorData);
    }

    actualizarAdministrador(id: string, administradorData: any): Observable<any>{
        return this.http.put(`${this.URL}/${id}`, administradorData);
    }

    eliminarAdministrador(id: string): Observable<any>{
        return this.http.delete(`${this.URL}/${id}`);
    }

    obtenerUnAdministrador(id: string): Observable<any> {
        return this.http.get(`${this.URL}/${id}`);
    }
}

/*


solicitudhorario
*/