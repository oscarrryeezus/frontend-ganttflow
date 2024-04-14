import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  
  private URL = 'backend-ganttflow.up.railway.app/api/area'

  constructor (private http: HttpClient) {}

  getArea(): Observable<any> {
    return this.http.get(this.URL);
  }

  getAreas(): Observable<any> {
    return this.http.get(this.URL);
  }

  getAreaById(NombreArea: string): Observable<any> {
    return this.http.get(`${this.URL}/${NombreArea}`);
  }

  crearArea(areaData: any): Observable<any> {
    return this.http.post(this.URL, areaData);
  }

  actualizarArea(NombreArea: string, areaData: any): Observable<any> {
    return this.http.put(`${this.URL}/${NombreArea}`, areaData);
  }

  eliminarArea(NombreArea: string): Observable<any> {
    return this.http.delete(`${this.URL}/${NombreArea}`);
  }

}
