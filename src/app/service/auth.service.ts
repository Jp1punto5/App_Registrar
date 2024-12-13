import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private apiURL = 'https://1256-181-43-90-154.ngrok-free.app'; // este endpoint es un tunel generado con ngrok
  private userData: any; //Almacena los datos de usuario

  private httpOptions =
  {
    headers : new HttpHeaders
    (
      {
        'Content-Type':'application/json'
      }
    )
  }

  constructor(private http: HttpClient) { }


  getLogin( correo: string, password: string): Observable<any>
  {
      const url = `${this.apiURL}/login`;
      const body = {correo , password};

      return this.http.post(url,body,this.httpOptions);
  }

  // metodo para almacenar datos de usuario

  setUserData(data:any): void 
  {
    this.userData = data;
  }
 // metodo para obtener los datos del usuario
  getUserData(): any 
  {
    return this.userData;
  }

  Eliminar_user(): any 
  {
    this.userData = null;

  }

  Validar_user(): boolean
  {
     return !!this.userData; // Devuelve True si hay datos del usuario
  }





}
