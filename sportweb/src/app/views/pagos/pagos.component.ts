import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Alumno2 } from '../../shared/model/alumno2';
import { Pago } from '../../shared/model/pago';
import { CrudServiceService } from '../../shared/services/crud-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  rows: any = [];
  temp: any = [];
  model2 = new Pago();
  estudianteList = new Alumno2();
  pagoList = new Pago();
  infoAlumno: Alumno2;
  model: Array<Alumno2>;
  entrada: string;
  entradaF: string;
  bandera: boolean;

  codigo: any = '';
  nombre: any = '';
  fecha: any = '';
  constructor(private crudServices: CrudServiceService,
    private modalService: NgbModal) {

    this.model = [];
    this.infoAlumno = new Alumno2();
    this.entrada = "";
    this.bandera = false;
    this.entradaF = "";

  }

  ngOnInit() {
    this.getEstudiantes();
    this.getPago();
  }
  getLimpiarFilter() {
    this.nombre = '';
    this.fecha = '';

    this.getEstudiantes();
  }

  onSubmit() {

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
  getPago() {
    this.pagoList = new Pago();
    this.crudServices.getModel('pagos').subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          this.model2 = data;
        }
      }
    );
  }
  retardo() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }
  async getBuscarFilter() {
    if (this.entrada === "" && this.entradaF === "") {
      Swal.fire({ icon: 'error', title: 'Error...', text: 'Campo requerido' });

    } else {
      this.bandera = false;
      this.getBuscarCodigo();

      console.log('calling');
      const result = await this.retardo();
      console.log(result);

      this.getBuscarNombre();
      this.entrada = "";

      console.log('calling');
      const result2 = await this.retardo();
      console.log(result2);

      if (this.model.length === 1 ) {
        for (var _i = 0; _i < this.model[0].mensualidades.length; _i++) {
          //mes:String = (this.model[0].mensualidades)[_i].PERIODO);
          //if((this.model[0].mensualidades)[_i].PERIODO). === this.entradaF){



        }
      }
    }
  }

  getBuscarNombre() {
    this.crudServices.getModel('alumnos?NOMBRE=' + this.entrada).subscribe(
      data => {
        if (!this.bandera) {
          if (JSON.stringify(data) === '[]' || data === '') {
            Swal.fire({ icon: 'warning', title: '¡Cuidado!', text: 'Estudiante no registrado!' });
            return
          } else {
            this.bandera = true;
            this.model = data;
          }
        }
      });
  }

  getBuscarCodigo() {
    this.crudServices.getModel('alumnos?ID_ALUMNO=' + this.entrada).subscribe(
      data => {
        if (JSON.stringify(data) === '[]') {
          Swal.fire({ icon: 'warning', title: '¡Cuidado!', text: 'Estudiante no registrado!' });
        } else {
          this.bandera = true;
          this.model = data;
        }
      });
  }


  mostrarPagos(alumno: Alumno2) {
    this.infoAlumno = alumno;
    this.modalService.open(this.myModalInfo, { size: 'lg' });
  }




}
