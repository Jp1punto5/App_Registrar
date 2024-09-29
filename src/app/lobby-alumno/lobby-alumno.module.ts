import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyAlumnoPageRoutingModule } from './lobby-alumno-routing.module';

import { LobbyAlumnoPage } from './lobby-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobbyAlumnoPageRoutingModule
  ],
  declarations: [LobbyAlumnoPage]
})
export class LobbyAlumnoPageModule {}
