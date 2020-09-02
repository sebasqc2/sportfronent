import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Entrenador } from '../../shared/model/entrenador';
import { Categoria } from '../../shared/model/categoria';
import { Deporte } from '../../shared/model/deporte';
import { CrudServiceService } from '../../shared/services/crud-service.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.scss']
})
export class DocenteComponent implements OnInit {
  @ViewChild('myModalInfo', { static: false }) myModalInfo: TemplateRef<any>;
  @ViewChild('myModalEstudiantes', { static: false }) myModalEstudiantes: TemplateRef<any>;

  model: Array<Entrenador>;
  copia: Array<Entrenador>;
  entrada: string;
  bandera: boolean;
  infoEntrenador: Entrenador;
  infoCategoria: Categoria;
  modelCategoria: Array<Categoria>;

  usuario: string = localStorage.getItem('usuario');
  rol: string = localStorage.getItem('rol');

  constructor(private crudServices: CrudServiceService, private modalService: NgbModal) {

    this.model = [];
    this.copia = [];
    this.modelCategoria = [];
    this.infoEntrenador = new Entrenador();
    this.infoCategoria = new Categoria();
    this.entrada = '';
    this.bandera = false;
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getEntrenadores();
    this.getCategorias();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
  }

  // tslint:disable-next-line: typedef
  limpiarBusqueda() {
    this.model = this.copia;
  }

  // tslint:disable-next-line: typedef
  mostrarInfo(entrenador: Entrenador) {
    this.infoEntrenador = entrenador;
    this.modalService.open(this.myModalInfo, { size: 'lg' });
  }

  // tslint:disable-next-line: typedef
  mostrarEstudiantes(categoria: Categoria) {
    this.infoCategoria = categoria;
    this.listaEstudiantes();
    this.modalService.open(this.myModalEstudiantes, { size: 'lg' });
  }

  // tslint:disable-next-line: typedef
  retardo() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 600);
    });
  }

  // tslint:disable-next-line: typedef
  getEntrenadores() {
    this.crudServices.getModel('entrenadors').subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({
            position: 'top-end', icon: 'info', title: 'No hay datos registrados',
            showConfirmButton: false, timer: 1500
          });
        } else {
          this.model = data;
          this.copia = data;
        }
      });
  }

  // tslint:disable-next-line: typedef
  async getBuscar() {
    if (this.entrada) {
      this.bandera = false;
      this.getBuscarCodigo();

      console.log('calling');
      const result = await this.retardo();
      console.log(result);

      if (!this.bandera) {
        this.getBuscarNombre();
      }

      this.entrada = null;
    } else {
      Swal.fire({ icon: 'error', title: 'Error...', text: 'Campo requerido' });
    }
  }

  // tslint:disable-next-line: typedef
  getCategorias() {
    this.crudServices.getModel('categorias').subscribe(
      data => {
        this.modelCategoria = data;
        return;
      }, (err) => {
        console.log('Error: Interno id');
      });
  }

  // tslint:disable-next-line: typedef
  getBuscarCodigo() {
    for (var i = 0; i < this.copia.length; i++) {
      if ((this.copia[i].ID_ENTRENADOR).toString() === this.entrada) {
        this.model = [];
        this.model.push(this.copia[i]);
        this.bandera = true;
        return;
      }
    }
  }

  // tslint:disable-next-line: typedef
  getBuscarNombre() {
    for (var i = 0; i < this.copia.length; i++) {
      if (this.copia[i].NOMBRE.toUpperCase() === this.entrada.toUpperCase()) {
        this.model = [];
        this.model.push(this.copia[i]);
        this.bandera = true;
        return;
      }
    }
    this.limpiarBusqueda();
    Swal.fire({ icon: 'warning', title: 'Error...', text: 'No se ha encontrado entrenador!' });
  }

  listaEstudiantes() {
    for (var i = 0; i < this.modelCategoria.length; i++) {
      if (this.infoCategoria.ID_CATEGORIA.toString() === this.modelCategoria[i].ID_CATEGORIA.toString()) {
        for (var j = 0; j < this.modelCategoria[i].alumnos.length; j++) {
          this.infoCategoria.alumnos = [];
          this.infoCategoria.alumnos.push(this.modelCategoria[i].alumnos[j]);
        }
        return;
      }
    }
  }
}
