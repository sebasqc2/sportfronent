import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { Alumno } from '../modelos/alumno';
import { Acudiente } from '../modelos/acudiente';
import { CrudServiceService } from '../crud-service.service'

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.scss']
})
export class EstudianteComponent implements OnInit {
  
  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;
  @ViewChild("AcudienteInfo", { static: false }) AcudienteInfo: TemplateRef<any>;

  model: Array<Alumno>;
  entrada: string;
  bandera: boolean;
  infoAlumno: Alumno;
  infoAcudiente:Acudiente;

  constructor(private crudServices: CrudServiceService, private modalService: NgbModal) {

    this.model = [];
    this.infoAlumno = new Alumno();
    this.infoAcudiente = new Acudiente();
    this.entrada = "";
    this.bandera = false;
  }

  ngOnInit() {
    //localStorage.setItem('token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk2MzI4MDI4LCJleHAiOjE1OTg5MjAwMjh9.kFFdv5NyLVcpk2tJ0tUnUmtGywRZPwX1E6Pnwlab1wI");
    this.getEstudiantes();
  }
  
  onSubmit() {
  }

  mostrarUniforme(alumno: Alumno){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Página en construcción',
    })
  }

  mostrarAcudiente(alumno: Alumno) {
    this.infoAcudiente=alumno.acudiente;
    this.modalService.open(this.AcudienteInfo,{size: 'lg'});
  }

  mostrarInfo(alumno: Alumno) {
    this.infoAlumno = alumno;
    this.modalService.open(this.myModalInfo,{size: 'lg'});
  }

  retardo() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 400);
    });
  }

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

  async getBuscar() {
    if (this.entrada === "") {
      Swal.fire({ icon: 'error', title: 'Error...', text: 'Campo requerido' });
    } else {
      this.bandera = false;
      this.getBuscarCodigo();

      console.log('calling');
      const result = await this.retardo();
      console.log(result);

      this.getBuscarNombre();
      this.entrada = "";
    }
  }

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
      });
  }

  getBuscarNombre() {
    this.crudServices.getModel('alumnos?NOMBRE=' + this.entrada).subscribe(
      data => {
        if (!this.bandera) {
          if (JSON.stringify(data) === '[]' || data === '') {
            Swal.fire({ icon: 'warning', title: 'Error...', text: 'No se ha encontrado estudiante!' });
            return
          } else {
            this.model = data;
          }
        }
      });
  }

}
