import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, filter, subscribeOn } from 'rxjs/operators';

import {Constanst} from 'src/app/model/constants';
import {Solicitud } from '../model/Solicitud';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(private http :HttpClient) { }


  pruebaConexion(): any
  {
   return  this.http.get(Constanst.URL+'/test').pipe(
     tap(response => {
       if (response) {
         console.log(response);
       }
     }),
   )}

  getSolicitud(id:number): any{
    return  this.http.get(Constanst.URL+'/getSolicitud/'+id).pipe(
      tap(response => {
        if (response) {
          console.log(response);
        }
      }),
    );
   }
 
  getSolicitudes(): any{
    return  this.http.get(Constanst.URL+'/getSolicitud').pipe(
      tap(response => {
        if (response) {
          console.log(response);
        }
      }),
    )}
 
   createSolicitud(solicitud :Solicitud): any {
         let body={         
           "id":            solicitud.id,
           "codigo":        solicitud.codigo,
           "descripcion":   solicitud.descripcion,
           "resumen":       solicitud.resumen,
           "idempleado":   solicitud.idempleado
         }
         return  this.http.post(Constanst.URL+'/crearSolicitud',body).pipe(
           tap(response => {
             if (response) {
               console.log(response);
             }
           }),
         )
   }
   updateSolicitud(solicitud :Solicitud): any {
    let body={         
      "id":            solicitud.id,
      "codigo":        solicitud.codigo,
      "descripcion":   solicitud.descripcion,
      "resumen":       solicitud.resumen,
      "idempleado":    solicitud.idempleado
    }
     return  this.http.put(Constanst.URL+'/updateSolicitud',body).pipe(
       tap(response => {
         if (response) {
           console.log(response);
         }
       }),
     )
   }
 
   deleteSolicitud(id :number): any {   
     return  this.http.delete(Constanst.URL+'/deleteSolicitud/'+id).pipe(
       tap(response => {
         if (response) {
           console.log(response);
         }
       }),
     )
   }
 


}
