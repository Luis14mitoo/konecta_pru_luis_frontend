import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {
  // --- Indica si se debe mostrar o no el dialog de crearEmpleado
  displayDialogInfoEmpleado   = false;
  displayDialogInfoSolicitud  = false;

  ver:string;

  constructor() {}

  ngOnInit() {
    
  }

  verEmpleado(ver :string): void {
   
    this.ver =ver;
    this.displayDialogInfoEmpleado = true;

  }
  salir() {
    this.displayDialogInfoEmpleado = false;
    this.displayDialogInfoSolicitud =false;
  }


  verSolicitud(ver :string): void {
   
    this.ver =ver;
    this.displayDialogInfoSolicitud =true;

  }
  
  
}
