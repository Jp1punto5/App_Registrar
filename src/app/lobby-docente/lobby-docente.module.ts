import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LobbyDocentePageRoutingModule } from './lobby-docente-routing.module';

import { LobbyDocentePage } from './lobby-docente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LobbyDocentePageRoutingModule
  ],
  declarations: [LobbyDocentePage]
})
export class LobbyDocentePageModule {}
