import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ConsumoAPIService } from '../service/consumo-api.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {

  constructor( private router: Router, private alertaC: AlertController, private activaR: ActivatedRoute, private consumoApi: ConsumoAPIService) { }
  //  este sera la seccion que se envia a la page de generarQR
  id_curso: string = '';
  curso : string = '';
  alumnos : any;
  ngOnInit(): void 
  {
      this.activaR.queryParams.subscribe(params => {

        this.id_curso = params['parametro'];
        const cursos = this.consumoApi.getCursoData();

        this.curso = cursos[this.id_curso].nombre;
        
        this.alumnos = cursos[this.id_curso].alumnos;
        console.log(this.alumnos);

      });
     
  }


  volver()
  {
    this.router.navigate(['/lobby-docente'],{queryParams:{authStatus: 'true'}});

  }

}
