import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators,FormGroup, FormControl} from '@angular/forms';

import {Empleado} from 'src/app/model/empleado'

import {ServicioEmpleadoService} from 'src/app/servicios/servicio-empleado.service';

@Component({
  selector: 'app-modal-crear',
  templateUrl: './modal-crear.component.html',
  styleUrls: ['./modal-crear.component.css'],
})
export class ModalCrearComponent implements OnInit {
  
  
  
  // --- Indica si se debe mostrar o no el dialog de crearEmpleado
  displayDialogInfoCrearEmpleado    = false;
  displayDialogInfoEditarEmpleado   = false;
  displayDialogInfoEliminarEmpleado = false;
  displayDialogInfoBuscarEmpleado   = false;
  displayDialogInfoGetAllEmpleado   = false;
  displayDialogInfoGetAlert         = false;
  displayDialogInfoTablaEmpleado    = false;

  formCrearEmpleado = new FormGroup({
    id: new FormControl(),
    fechaIngreso: new FormControl(),
    nombre: new FormControl(),
    salario: new FormControl(),
  });

  @Input() mostrar:any;  

  empleado: Empleado ={
    id:null,
    fechaingreso:null,
    nombre:null,
    salario:null
  }

  empleados : Empleado[];

  mensajeUsuario: String='';
  


  constructor(
    private fb: FormBuilder,
    private empleadoService:ServicioEmpleadoService
    ) {}

  ngOnInit() {
    this.verEmpleado();   
  }
  alerta(mensaje: any){
    this.mensajeUsuario=mensaje;
    this.displayDialogInfoGetAlert         = true;
  }

  closeAlerta(){
    this.mensajeUsuario='';
    this.displayDialogInfoGetAlert         = false;
    
  }

  verEmpleado(): void {
    this.salir();
    if(this.mostrar=="CrearEmpleado"){this.displayDialogInfoCrearEmpleado        = true;}
    if(this.mostrar=="EditarEmpleado"){this.displayDialogInfoEditarEmpleado      = true;}
    if(this.mostrar=="EliminarEmpleado"){this.displayDialogInfoEliminarEmpleado  = true;}
    if(this.mostrar=="BuscarEmpleado"){this.displayDialogInfoBuscarEmpleado      = true;}
    if(this.mostrar=="ListarEmpleados"){this.displayDialogInfoGetAllEmpleado     = true;
        this.getAllEmpleado()}    

    this.formEmpleadoInit();
  }

  formEmpleadoInit(){
    this.formCrearEmpleado = this.fb.group({
      id: this.fb.control(null, Validators.required),
      fechaIngreso: this.fb.control(null, Validators.required),
      nombre: this.fb.control(null, Validators.required),
      salario: this.fb.control(null, Validators.required),
      });
  }

  salir() {  
  this.displayDialogInfoCrearEmpleado    = false;
  this.displayDialogInfoEditarEmpleado   = false;
  this.displayDialogInfoEliminarEmpleado = false;
  this.displayDialogInfoBuscarEmpleado   = false;
  this.displayDialogInfoGetAllEmpleado   = false;   
  }

  crearEmpleado() { 
    this. closeAlerta();
    let respuesta;

    this.empleado.id            =this.formCrearEmpleado.get("id").value;  
    this.empleado.fechaingreso  =this.formCrearEmpleado.get("fechaIngreso").value;
    this.empleado.nombre        =this.formCrearEmpleado.get("nombre").value;
    this.empleado.salario       =this.formCrearEmpleado.get("salario").value; 

    this.empleadoService.createEmpleado( this.empleado).subscribe(
    res=>{
          respuesta =res.message;
          this.formEmpleadoInit();
          this.alerta(respuesta);
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }

  getEmpleado() { 
    this. closeAlerta();
    let respuesta;
    let id = this.formCrearEmpleado.get("id").value; 
    this.empleadoService.getEmpleado(id).subscribe(
    res=>{
          this.empleado =res;
          this.displayDialogInfoTablaEmpleado=true;          
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }

  getAllEmpleado() { 
    this. closeAlerta();
    let respuesta;   
    this.empleadoService.getEmpleados().subscribe(
    res=>{

          this.empleados =res.listempleados;
          console.log('Res***********************'+res);
          this.displayDialogInfoTablaEmpleado=true;          
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }

  getEmpleadoParaEditar() { 
    this. closeAlerta();
    let respuesta;
    let fechaIngresoA :Date;
    let fechaIngresoB;
    let id = this.formCrearEmpleado.get("id").value; 
    this.empleadoService.getEmpleado(id).subscribe(
    res=>{
        this.empleado =res; 
       
        this.formCrearEmpleado.get("fechaIngreso").setValue(this.empleado.fechaingreso);
        this.formCrearEmpleado.get("nombre").setValue(this.empleado.nombre );
        this.formCrearEmpleado.get("salario").setValue(this.empleado.salario);            
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }
 
  editarEmpleado() { 
    this. closeAlerta();
    let respuesta;

    this.empleado.id            =this.formCrearEmpleado.get("id").value;  
    this.empleado.fechaingreso  =this.formCrearEmpleado.get("fechaIngreso").value;
    this.empleado.nombre        =this.formCrearEmpleado.get("nombre").value;
    this.empleado.salario       =this.formCrearEmpleado.get("salario").value; 

    this.empleadoService.updateEmpleado(this.empleado).subscribe(
    res=>{
          respuesta =res.message;
          this.formEmpleadoInit();
          this.alerta(respuesta);
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }


  deleteEmpleado() { 
    this. closeAlerta();
    let respuesta;
    let id = this.formCrearEmpleado.get("id").value; 
    this.empleadoService.deleteEmpleado(id).subscribe(
    res=>{
          respuesta =res.message;
          this.displayDialogInfoTablaEmpleado=true; 
          this.alerta(respuesta);          
          }),
    error=> {
            respuesta =error.message;
            this.alerta(respuesta);   
            }  
  }
}
