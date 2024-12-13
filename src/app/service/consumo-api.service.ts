import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoAPIService {

  httpOptions = 
  {
    headers : new HttpHeaders 
     (
      {
        'Content-Type':'application/json',
        //  'Access-Control-Allow-Origin':'*'
      }
     )
  }

  private apiURL = 'https://1256-181-43-90-154.ngrok-free.app';
  private cursoData : any;



  constructor(private http:HttpClient) { }


  getPost():Observable<any>
  {
    return this.http.get(this.apiURL+'/login');
  }

  // el siguiente metodo es para poder obtener los usuarios


  // obtenemos los datos del curso de cada profesor
  getCursos(id_p:string): Observable<any>
  {

    const url = `${this.apiURL}/profesores/${id_p}/cursos`;
    console.log(url+'  bandera 1');
    return this.http.options(url,this.httpOptions);

  }

  //metodo para registrar asistencia
  setAsistencia(codigo_c:string,codigo_s:string,correo_a:string): Observable<any>
  {
      const url = `${this.apiURL}/regis_asistencia/${codigo_c}/${codigo_s}/${correo_a}`;
      console.log(url);
      return this.http.post(url,this.httpOptions);
  }



  // guardamos los datos de los cursos
  setCursoData(data:any):void
  {
    this.cursoData = data;
  }
  // obtenemos los datos de los cursos
  getCursoData():any
  {
    return this.cursoData;
  }

  //eliminamos los datos de los curso almacenados
  eliminarCursos():any 
  {
    this.cursoData = null;
  }





}
