import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-lobby-alumno',
  templateUrl: './lobby-alumno.page.html',
  styleUrls: ['./lobby-alumno.page.scss'],
})
export class LobbyAlumnoPage implements OnInit {

  constructor(private router: Router , private alerta: AlertController, private validar : AuthService ) {}



  async cerrarSesion()
  {
     this.validar.Eliminar_user();
     console.log(this.validar.getUserData());
     console.log(this.validar.Validar_user());
     this.router.navigate(['/home']);
 
  }

  saludo : String = ''; // este sera el nombre del estudiante


  ngOnInit() {

    this.saludo = this.validar.getUserData().nombre;

  }

}
