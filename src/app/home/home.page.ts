import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  // segment = 'scan';

  segment = 'DOCENTE';
  correoP = '';
  passP = '';
  correoA = '';
  passA = '';

  constructor( private consumoApi : AuthService,private router: Router , private alerta: AlertController ) {}


  ngOnInit(): void {
    // AQUI PUEDO PONER EL CODIGO QUE SE EJECUTE APENAS CARGUE LA PAGINA
  }



  async navegarPage(usuario: string , form: NgForm)
  {
     
     if(usuario === 'profesor')
     {
      const correoP = form.value.txtCorreo_prof;
      const passP = form.value.txtPass_prof;
      
 
        if(!correoP.includes('@'))
          {
              await this.mostrarAlerta('ERROR: el correo ingresado es incorrecto, ya que no contiene un Dominio real.. favor incluir el simbolo @');
              return;
          }
       if(!correoP.includes('.cl') && !correoP.includes('.com'))
         {
           await this.mostrarAlerta('ERROR: todo correo electronico debe finalizar con su .cl o .com');
           return;
         }
        if(!correoP)
        {
          await this.mostrarAlerta('El campo correo electronico del profesor no puede estar vacio');
          return;
        }
        if(!passP)
        {
          await this.mostrarAlerta('El campo contraseña del profesor no puede estar vacio');
          return;
        }


        // este valida el correo del profesor

        this.consumoApi.getLogin(correoP,passP).subscribe
        (
            data => 
              { // esto es si es verdadero
                  console.log("Datos del usuario: " , data);
                  this.consumoApi.setUserData(data);
                  if('docente' === this.consumoApi.getUserData().user)
                  {
                    this.router.navigate(['/lobby-docente'],{queryParams:{authStatus: this.consumoApi.Validar_user()}});
                  }
                  else 
                  {
                    this.router.navigate(['/**'],{queryParams:{error:'No tiene acceso: Las credenciales de acceso no son de un Profesor',msj:'401'}});
                  }
                  
              },
            error =>
              {
                 console.error("Error al iniciar sesion> " , error);
                 this.router.navigate(['/**'], {queryParams:{error:'no tiene permiso para acceder', msj: '401'}});
              }
        );
     }

     if(usuario === 'alumno')
     {
      const correoA = form.value.txtCorreo_alum;
      const passA = form.value.txtPass_alum;

      if(!correoA.includes('@'))
        {
            await this.mostrarAlerta('ERROR: el correo ingresado es incorrecto, ya que no contiene un Dominio real.. favor incluir el simbolo @');
            return;
        }
      if(!correoA.includes('.cl') && !correoA.includes('.com'))
        {
          await this.mostrarAlerta('ERROR: todo correo electronico debe finalizar con su .cl o .com');
          return;
        }
      if(!correoA)
        {
          await this.mostrarAlerta('El campo correo electronico del alumno no puede estar vacio');
          return;
        }
        if(!passA)
        {
          await this.mostrarAlerta('El campo contrasena del alumno no puede estar vacio');
          return;
        }

        this.consumoApi.getLogin(correoA,passA).subscribe
        (
            data => 
              { // esto es si es verdadero
                  console.log("Datos del usuario: " , data);
                  this.consumoApi.setUserData(data);
                  if('alumno'===this.consumoApi.getUserData().user)
                  {
                    this.router.navigate(['/lobby-alumno'],{queryParams:{authStatus: this.consumoApi.Validar_user()}});
                  }else
                  {
                    this.router.navigate(['/**'],{queryParams:{error:'No tiene acceso: Las credenciales de acceso no son de un Alumno',msj:'401'}});
                  }

              },
            error =>
              {
                 console.error("Error al iniciar sesion> " , error);
                 this.router.navigate(['/**'], {queryParams:{error:'no tiene permiso para acceder', msj: '401'}});
              }
        );
     }
    
  } // fin funcion de navegacion


  // aqui comienza la funcion de alerta o popup

  async mostrarAlerta(mensaje:string)
  {
     const alert = await this.alerta.create({

       header: 'Atencion',
       message: mensaje,
       buttons:['OK']
     });

     await alert.present();
  }

}
