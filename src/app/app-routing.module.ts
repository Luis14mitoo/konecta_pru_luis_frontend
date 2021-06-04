import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicialComponent } from './inicial/inicial.component';
import { ModalCrearComponent } from './inicial/modal-crear/modal-crear.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {
    path: 'inicio',
    component: InicialComponent,
  },
  {
    path: 'modal',
    component: ModalCrearComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
