import { Injectable,  } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, map, tap, filter, subscribeOn } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import {Constanst} from 'src/app/model/constants';
import { Empleado } from '../model/empleado';

@Injectable({
  providedIn: 'root'
})
export class ServicioEmpleadoService {

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

 getEmpleado(id:number): any{
   return  this.http.get(Constanst.URL+'/getEmpleado/'+id).pipe(
     tap(response => {
       if (response) {
         console.log(response);
       }
     }),
   );
  }

 getEmpleados(): any{
   return  this.http.get(Constanst.URL+'/empleados').pipe(
     tap(response => {
       if (response) {
         console.log(response);
       }
     }),
   )}

  createEmpleado(empleado :Empleado): any {
        let body={
          "id":                 empleado.id,
          "fechaingreso":       empleado.fechaingreso,
          "nombre":             empleado.nombre,
          "salario":            empleado.salario
        }
        return  this.http.post(Constanst.URL+'/crear',body).pipe(
          tap(response => {
            if (response) {
              console.log(response);
            }
          }),
        )
  }
  updateEmpleado(empleado :Empleado): any {
    let body={
      "id":                 empleado.id,
      "fechaingreso":       empleado.fechaingreso,
      "nombre":             empleado.nombre,
      "salario":            empleado.salario
    }
    return  this.http.put(Constanst.URL+'/updateEmpleado',body).pipe(
      tap(response => {
        if (response) {
          console.log(response);
        }
      }),
    )
  }

  deleteEmpleado(id :number): any {   
    return  this.http.delete(Constanst.URL+'/deleteEmpleado/'+id).pipe(
      tap(response => {
        if (response) {
          console.log(response);
        }
      }),
    )
  }




}
