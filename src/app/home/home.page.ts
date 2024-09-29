import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  // segment = 'scan';

  segment = 'DOCENTE';
  correoP = '';
  passP = '';
  correoA = '';
  passA = '';

  constructor(private router: Router , private alerta: AlertController ) {}

  async navegarPage(usuario: string , form: NgForm)
  {
    // obtengo los valores del formulario 


     
     if(usuario === 'profesor')
     {
      const correoP = form.value.txtCorreo_prof;
      const passP = form.value.txtPass_prof;
        if(!correoP)
        {
          await this.mostrarAlerta('El campo correo electronico del profesor no puede estar vacio');
          return;
        }
        if(!passP)
        {
          await this.mostrarAlerta('El campo contrasena del profesor no puede estar vacio');
          return;
        }

        if(correoP && passP)
        {
          this.router.navigate(['/lobby-docente']);
        }
     }

     if(usuario === 'alumno')
     {
      const correoA = form.value.txtCorreo_alum;
      const passA = form.value.txtPass_alum;
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

        if(correoA && passA)
        {
          this.router.navigate(['/lobby-alumno']);
        }
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
