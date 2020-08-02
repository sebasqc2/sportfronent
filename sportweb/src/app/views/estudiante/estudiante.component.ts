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
  entrada: string;
  bandera: boolean;
  infoAlumno: Alumno;
  infoAcudiente: Acudiente;

  constructor(private crudServices: CrudServiceService, private modalService: NgbModal) {

    this.model = [];
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
  mostrarUniforme(alumno: Alumno){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Página en construcción',
    });
  }

  // tslint:disable-next-line: typedef
  mostrarAcudiente(alumno: Alumno) {
    this.infoAcudiente = alumno.acudiente;
    this.modalService.open(this.AcudienteInfo, {size: 'lg'});
  }

  // tslint:disable-next-line: typedef
  mostrarInfo(alumno: Alumno) {
    this.infoAlumno = alumno;
    this.modalService.open(this.myModalInfo, {size: 'lg'});
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
        }
      });
  }

  // tslint:disable-next-line: typedef
  async getBuscar() {
    if (this.entrada ) {
      this.bandera = false;
      this.getBuscarCodigo();

      console.log('calling');
      const result = await this.retardo();
      console.log(result);

      this.getBuscarNombre();
      this.entrada = null;
    } else {
      Swal.fire({ icon: 'error', title: 'Error...', text: 'Campo requerido' });
    }

  }

  // tslint:disable-next-line: typedef
  getBuscarCodigo() {
    this.crudServices.getModel('alumnos?ID_ALUMNO=' + this.entrada).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({ icon: 'warning', title: 'Error...', text: 'No se ha encontrado estudiante!' });
          this.bandera = true;
        } else {
          this.model = data;
          this.bandera = true;
        }
      }, (err) => {
        console.log('Error: Interno id' );
        // console.log(err);


      }
      );
  }

  // tslint:disable-next-line: typedef
  getBuscarNombre() {
    this.crudServices.getModel('alumnos?NOMBRE=' + this.entrada).subscribe(
      data => {
        if (!this.bandera) {
          if (JSON.stringify(data) === '[]' || data === '') {
            Swal.fire({ icon: 'warning', title: 'Error...', text: 'No se ha encontrado estudiante!' });
            return;
          } else {
            this.model = data;
          }
        }
      }, (err) => {
        console.log('Error: Interno nombre' );
        // console.log(err);
      }
      );
  }

}
