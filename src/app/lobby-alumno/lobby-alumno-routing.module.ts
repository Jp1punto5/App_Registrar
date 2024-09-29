import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LobbyAlumnoPage } from './lobby-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: LobbyAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LobbyAlumnoPageRoutingModule {}
