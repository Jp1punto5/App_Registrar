import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyDocentePage } from './lobby-docente.page';

const routes: Routes = [
  {
    path: '',
    component: LobbyDocentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LobbyDocentePageRoutingModule {}
