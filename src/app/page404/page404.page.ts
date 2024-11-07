import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.page.html',
  styleUrls: ['./page404.page.scss'],
})
export class Page404Page implements OnInit {

  constructor(private activaR: ActivatedRoute, private router : Router) { }

   msj: string = '';
   error: string = '';

  ngOnInit() {

    this.activaR.queryParams.subscribe(p => {

         this.msj = p['error'];
         this.error = p['msj'];
    });
  }


  volver()
  {
    this.router.navigate(['/home']);
  }

}
