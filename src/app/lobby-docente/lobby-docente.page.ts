import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
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

  saludo: string = ''; 

  ngOnInit(): void {

    this.activaR.queryParams.subscribe(params => {

       this.saludo = params['correoP'];
    });
  }

}
