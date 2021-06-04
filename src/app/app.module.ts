import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicialComponent } from './inicial/inicial.component';
import { ModalCrearComponent } from 'src/app/inicial/modal-crear/modal-crear.component';
import { CrearSolicitudComponent } from './inicial/crear-solicitud/crear-solicitud.component';

@NgModule({
  declarations: [AppComponent, InicialComponent, ModalCrearComponent, CrearSolicitudComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
