import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {

  constructor( private router: Router, private alertaC: AlertController, private activaR: ActivatedRoute) { }
  //  este sera la seccion que se envia a la page de generarQR
  seccion: string = '';
  ngOnInit(): void {
      this.activaR.queryParams.subscribe(params => {

        this.seccion = params['parametro'];
      });
     
  }

}
