import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private URL = 'http://localhost:3000/api/auth'


  constructor(private http: HttpClient){}

  logIn(valoresLogin: any): Observable<any>{
    return this.http.post(`${this.URL}/login`, valoresLogin)
  }

  logOut(valoresLogout: any): Observable<any>{
    return this.http.post(`${this.URL}/logout`,valoresLogout )
  }
  
  getUserRole(): any {
    return this.http.get<string>(`${this.URL}/login`).pipe(
      map((userData: any) => {
        return userData.role; // Suponiendo que el rol del usuario está presente en el objeto userData
      })
    );
  }
  
}
