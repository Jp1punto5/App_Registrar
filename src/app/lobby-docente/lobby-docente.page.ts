import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ɵnormalizeQueryParams } from '@angular/common';

@Component({
  selector: 'app-lobby-docente',
  templateUrl: './lobby-docente.page.html',
  styleUrls: ['./lobby-docente.page.scss'],
})
export class LobbyDocentePage implements OnInit {

  

  constructor(private router: Router , private alerta: AlertController , private activaR: ActivatedRoute) {}

//  esto es para cerrar sesion 
 async cerrarSesion()
 {
    this.router.navigate(['/home']);

 }
  // este es el parametro que recibo del home
  saludo: string = ''; 


  ngOnInit(): void 
  {

    this.activaR.queryParams.subscribe(params => {

       this.saludo = params['parametro'];
    });
  } // fin del void que arranca al iniciar la page


  navegarQR(curso : string)
  {

      if(curso === 'calidad')
      {
         this.router.navigate(['/generar-qr'], {queryParams: {parametro: 'Calidad de Software V_001'}});
      }
      if(curso === 'ingles')
      {
          this.router.navigate(['/generar-qr'], {queryParams: {parametro: 'Ingles Elemental INU_I003'}});
      }

      if(curso === 'apli')
      {
          this.router.navigate(['/generar-qr'], {queryParams: {parametro: 'Aplicaciones Moviles A_P002'}});
      }


  } // función o metodo para enviar los parametros a la otra page

}
