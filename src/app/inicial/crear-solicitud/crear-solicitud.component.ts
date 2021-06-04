import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators,FormGroup, FormControl} from '@angular/forms';


import {Empleado} from 'src/app/model/empleado'
import {Solicitud} from 'src/app/model/Solicitud'
import {Solicitud_nombre} from 'src/app/model/Solicitud_nombre'


import {ServicioEmpleadoService} from 'src/app/servicios/servicio-empleado.service';
import {SolicitudService} from 'src/app/servicios/solicitud.service';


@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {

  
  // --- Indica si se debe mostrar o no el dialog de crearEmpleado
  displayDialogInfoCrearSolicitud    = false;
  displayDialogInfoEditarSolicitud   = false;
  displayDialogInfoEliminarSolicitud = false;
  displayDialogInfoBuscarSolicitud   = false;
  displayDialogInfoGetAllSolicitud   = false;
  displayDialogInfoGetAlert         = false;
  displayDialogInfoTablaSolicitud    = false;

  listSolicitudes:Solicitud [];
  solicitud : Solicitud ={
    id:            null,
    codigo:        null,
    descripcion:   null,
    resumen:       null,
    idempleado:   null,
  }
  empleado: Empleado ={
    id:0,
    fechaingreso:null,
    nombre:'XX',
    salario:null
  }

  empleados : Empleado[];

  mensajeUsuario: String='';

  formCrearSolicitud = new FormGroup({
    id: new FormControl(),
    codigo: new FormControl(),
    descripcion: new FormControl(),
    resumen: new FormControl(),
    idempleado: new FormControl(),
  });

  @Input() mostrar:any;  

  


  constructor(
    private fb: FormBuilder,
    private empleadoService:ServicioEmpleadoService,
    private solicitudService:SolicitudService

    ) {}

  ngOnInit() {
    this.verSolicitud();   
  }
  alerta(mensaje: any){
    this.mensajeUsuario=mensaje;
    this.displayDialogInfoGetAlert         = true;
  }

  closeAlerta(){
    this.mensajeUsuario='';
    this.displayDialogInfoGetAlert         = false;
    
  }

  verSolicitud(): void {
    this.salir();
    if(this.mostrar=="CrearSolicitud"){this.displayDialogInfoCrearSolicitud        = true;}
    if(this.mostrar=="EditarSolicitud"){this.displayDialogInfoEditarSolicitud      = true;}
    if(this.mostrar=="EliminarSolicitud"){this.displayDialogInfoEliminarSolicitud  = true;}
    if(this.mostrar=="BuscarSolicitud"){this.displayDialogInfoBuscarSolicitud      = true;}
    if(this.mostrar=="ListarSolicitudes"){this.displayDialogInfoGetAllSolicitud     = true;
        this.getAllSolicitudes()}    

    this.formSolicitudInit();
  }

  formSolicitudInit(){ 
    this.formCrearSolicitud = this.fb.group({
      id: this.fb.control(null, Validators.required),
      codigo: this.fb.control(null, Validators.required),
      descripcion: this.fb.control(null, Validators.required),
      resumen: this.fb.control(null, Validators.required),
      idempleado: this.fb.control(null, Validators.required)
      });
  }

  salir() {  
  this.displayDialogInfoCrearSolicitud    = false;
  this.displayDialogInfoEditarSolicitud   = false;
  this.displayDialogInfoEliminarSolicitud = false;
  this.displayDialogInfoBuscarSolicitud   = false;
  this.displayDialogInfoGetAllSolicitud   = false;   
  }

  crearSolicitud() { 
    this. closeAlerta();
    let respuesta;
    this.solicitud.id            =this.formCrearSolicitud.get("id").value;
    this.solicitud.codigo        =this.formCrearSolicitud.get("codigo").value;  
    this.solicitud.descripcion   =this.formCrearSolicitud.get("descripcion").value;  
    this.solicitud.resumen       =this.formCrearSolicitud.get("resumen").value;  
    this.solicitud.idempleado   =this.formCrearSolicitud.get("idempleado").value; 
   
    this.solicitudService.createSolicitud(this.solicitud).subscribe(
    res=>{
          respuesta =res.message;
          this.formSolicitudInit();
          this.alerta(respuesta);
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }
  getEmpleado(id:number) { 
    this. closeAlerta();
    let respuesta;
    
    this.empleadoService.getEmpleado(id).subscribe(
    res=>{
          this.empleado =res;
                  
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }
  getSolicitud() { 
    this. closeAlerta();
    let respuesta;
    let id = this.formCrearSolicitud.get("id").value; 
    this.solicitudService.getSolicitud(id).subscribe(
    res=>{
          this.solicitud =res;
          this.getEmpleado(this.solicitud.idempleado)
          this.displayDialogInfoTablaSolicitud=true;          
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }

  getAllSolicitudes() { 
    this.closeAlerta();
    let respuesta;   
    this.solicitudService.getSolicitudes().subscribe(
    res=>{

          this.listSolicitudes = res;
          console.log('Res***********************'+res);
          this.displayDialogInfoTablaSolicitud=true;          
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }

  getSolicitudParaEditar() { 
    this. closeAlerta();
    let respuesta;
    
    let id = this.formCrearSolicitud.get("id").value; 
    this.solicitudService.getSolicitud(id).subscribe(
    res=>{
        this.solicitud =res; 
       
        this.formCrearSolicitud.get("codigo").setValue(this.solicitud.codigo);
        this.formCrearSolicitud.get("descripcion").setValue(this.solicitud.descripcion);
        this.formCrearSolicitud.get("resumen").setValue(this.solicitud.resumen);
        this.formCrearSolicitud.get("idempleado").setValue(this.solicitud.idempleado);                
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }
 
  editarSolicitud() { 
    this.closeAlerta();
    let respuesta;
    this.solicitud.id            =this.formCrearSolicitud.get("id").value;
    this.solicitud.codigo        =this.formCrearSolicitud.get("codigo").value;
    this.solicitud.descripcion   =this.formCrearSolicitud.get("descripcion").value; 
    this.solicitud.resumen       =this.formCrearSolicitud.get("resumen").value;
    this.solicitud.idempleado    =this.formCrearSolicitud.get("idempleado").value;
    this.solicitudService.updateSolicitud(this.solicitud).subscribe(
    res=>{
          respuesta =res.message;
         this.formSolicitudInit();
          this.alerta(respuesta);
          }),
    error=> {
            respuesta =error;
            this.alerta(respuesta);   
            }  
  }


  deleteSolicitud() { 
    this. closeAlerta();
    let respuesta;
    let id = this.formCrearSolicitud.get("id").value; 
    this.solicitudService.deleteSolicitud(id).subscribe(
    res=>{
          respuesta =res.message;
          this.displayDialogInfoTablaSolicitud=true; 
          this.alerta(respuesta);          
          }),
    error=> {
            respuesta =error.message;
            this.alerta(respuesta);   
            }  
  }

}


