import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Iservicioback} from './Iservicioback';
import { actividadInterface } from '../model/actividadInterface';
import {cursosInterface} from '../model/cursosInterface';
import {categoriasInterface} from '../model/categoriasInterface';


@Injectable({
  providedIn: 'root'
})
export class ServiciobackService implements Iservicioback{

  constructor(private http: HttpClient) { }
  obtenerCategorias(url: string) {
    return this.http.get(url);
  }
  obtenerCursos(url: string){
    return this.http.get(url);
  }
  
  agregarActividad(url:string, actividad: actividadInterface){
    return this.http.post(url, actividad);
  }


}
