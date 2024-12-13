import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ConsumoAPIService } from '../service/consumo-api.service';
import { Subscription } from 'rxjs';



//al crear esta interfaz me permite manipular el arreglo del curso más abajo y poder recorrer todos sus atributos
interface Curso 
{
  id: number;
  codigo: string;
  nombre: string;
  seccion: string;
}

@Component({
  selector: 'app-lobby-docente',
  templateUrl: './lobby-docente.page.html',
  styleUrls: ['./lobby-docente.page.scss'],
})



export class LobbyDocentePage implements OnInit, OnDestroy {

  

  constructor(private router: Router , private alerta: AlertController , private activaR: ActivatedRoute,
   private validar: AuthService, private consumoApi: ConsumoAPIService

  ) {}

//  esto es para cerrar sesion 
 async cerrarSesion()
 {
   this.validar.Eliminar_user();
   this.consumoApi.eliminarCursos();
   console.log(this.validar.getUserData());
   console.log(this.validar.Validar_user());
  this.router.navigate(['/home']);

 }



  // este es el parametro que recibo del home
  saludo: string = ''; // esto despues sera el nombre del usuario
  estado: string = '';
  cursos : any = []; // declaro como array esta variable
  private intervalo: any;
  private subscription: Subscription | null = null;
 
  ngOnInit(): void 
  {
   this.saludo = this.validar.getUserData().nombre;
   this.estado = this.validar.getUserData().id;
   console.log(this.saludo); // aqui viene el nombre del usuario
   console.log(this.estado); // aqui viene su identificador
   this.obtenerCurso();
   this.intervalo = setInterval(() => 
    {
       this.obtenerCurso();
    }, 10000); // 10000 ms = 10 segundos

  
  } // fin del void que arranca al iniciar la page




  obtenerCurso()
  {
      this.subscription = this.consumoApi.getCursos(this.estado).subscribe
    (
        data =>
          {
          
            this.consumoApi.setCursoData(data);
            console.log('cursos  ', this.consumoApi.getCursoData());
            // aqui agrego los cursos donde los necesito
            this.cursos = this.consumoApi.getCursoData() as Curso[];
          },
        error =>
        {
          console.log('El Docente no tiene cursos asignados',error);
        }
    );
  } // fin metodo para obtener el curso


  navegarQR(curso : string)
  {

     const cursoEncontrado = (this.cursos as Curso[]).find(
        (item) => `${item.seccion}_${item.nombre}` === curso
     );
      if(cursoEncontrado)
      {
        console.log("se esta enviando el dato");
         this.router.navigate(['/generar-qr'], {queryParams: {parametro: cursoEncontrado.id-1}});
      }
      else
      {
      
        this.router.navigate(['/**'], {queryParams:{error:'no existe el curso seleccionado', msj: '401'}});;
      }


  } // función o metodo para enviar los parametros a la otra page


  ngOnDestroy() {
     // Limpia el intervalo y la suscripcion al destruir el componente
     if(this.intervalo)
     {
       clearInterval(this.intervalo);
     }

     if(this.subscription)
     {
       this.subscription.unsubscribe();
     }

    }

}
