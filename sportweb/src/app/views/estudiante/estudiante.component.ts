import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Alumno } from '../../shared/model/alumno';
import { Acudiente } from '../../shared/model/acudiente';
import { CrudServiceService } from '..//../shared/services/crud-service.service';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {
  @ViewChild('myModalInfo', { static: false }) myModalInfo: TemplateRef<any>;
  @ViewChild('AcudienteInfo', { static: false }) AcudienteInfo: TemplateRef<any>;

  model: Array<Alumno>;
  copia: Array<Alumno>;
  entrada: string;
  bandera: boolean;
  infoAlumno: Alumno;
  infoAcudiente: Acudiente;

  usuario: string = localStorage.getItem('usuario');
  rol: string = localStorage.getItem('rol');

  constructor(private crudServices: CrudServiceService, private modalService: NgbModal) {

    this.model = [];
    this.copia = [];
    this.infoAlumno = new Alumno();
    this.infoAcudiente = new Acudiente();
    this.entrada = '';
    this.bandera = false;
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.getEstudiantes();
  }

  // tslint:disable-next-line: typedef
  onSubmit() {
  }

  // tslint:disable-next-line: typedef
  limpiarBusqueda() {
    this.model = this.copia;
  }

  // tslint:disable-next-line: typedef
  mostrarUniforme(alumno: Alumno) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Página en construcción',
    });
  }

  // tslint:disable-next-line: typedef
  mostrarAcudiente(alumno: Alumno) {
    this.infoAcudiente = alumno.acudiente;
    this.modalService.open(this.AcudienteInfo, { size: 'lg' });
  }

  // tslint:disable-next-line: typedef
  mostrarInfo(alumno: Alumno) {
    this.infoAlumno = alumno;
    this.modalService.open(this.myModalInfo, { size: 'lg' });
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
  getEstudiantes() {
    this.crudServices.getModel('alumnos').subscribe(
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
  getBuscarCodigo() {
    for (var i = 0; i < this.copia.length; i++) {
      if ((this.copia[i].ID_ALUMNO).toString() === this.entrada) {
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
}
