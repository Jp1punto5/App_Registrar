import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lobby-alumno',
  templateUrl: './lobby-alumno.page.html',
  styleUrls: ['./lobby-alumno.page.scss'],
})
export class LobbyAlumnoPage implements OnInit {

  constructor(private router: Router , private alerta: AlertController ) {}



  async cerrarSesion()
  {
     this.router.navigate(['/home']);
 
  }


  ngOnInit() {
  }

}
