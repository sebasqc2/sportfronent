import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Alumno } from '../../shared/model/alumno';
import { Acudiente } from '../../shared/model/acudiente';
import { CrudServiceService } from '../../shared/services/crud-service.service';

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

  constructor(private crudServices: CrudServiceService, private modalService: NgbModal
    ) {

    this.model = [];
    this.copia = [];
    this.infoAlumno = new Alumno();
    this.infoAcudiente = new Acudiente();
    this.entrada = '';
    this.bandera = false;
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
    // El comentado otra forma de mejora
    // this.getDatosEstudiantes();
    this.getEstudiantes();
  }
  // tslint:disable-next-line: typedef
  onSubmit() {
  }

  mostrarUniforme(alumno: Alumno): void{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Página en construcción',
    });
  }

  mostrarAcudiente(alumno: Alumno): void {
    this.infoAcudiente = alumno.acudiente;
    this.modalService.open(this.AcudienteInfo, {size: 'lg'});
  }

  mostrarInfo(alumno: Alumno): void {
    this.infoAlumno = alumno;
    this.modalService.open(this.myModalInfo, {size: 'lg'});
  }


  // retardo(milis: number): any {
  //    return new Promise(resolve => {
  //      setTimeout(() => {
  //        resolve('resolved');
  //      }, milis);
  //    });
  // }

  retardo(): any {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 600);
    });
  }

  getEstudiantes(): any {
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

  // getDatosEstudiantes(): void{
  //   if (localStorage.getItem('usuario') !== 'Administrador') {
  //     this.getEstudiantes(`alumnos/find/${localStorage.getItem('usuario')}`);
  //   }else{
  //     this.getEstudiantes('alumnos');
  //   }
  // }

  // getEstudiantes(ruta: string): void {
  //   this.crudServices.getModel(ruta).subscribe(
  //     data => {
  //       if (JSON.stringify(data) === '[]') {
  //         Swal.fire({
  //           position: 'top-end', icon: 'info', title: 'No hay datos registrados',
  //           showConfirmButton: false, timer: 1500
  //         });
  //       } else {
  //         this.model = data;
  //       }
  //     });
  // }
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
  getBuscarCodigo(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.copia.length; i++) {
      if ((this.copia[i].ID_ALUMNO).toString() === this.entrada) {
        this.model = [];
        this.model.push(this.copia[i]);
        this.bandera = true;
        return;
      }
    }
  }

  getBuscarNombre(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.copia.length; i++) {
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

  limpiarBusqueda(): void {
    this.model = this.copia;
  }
  // tslint:disable-next-line: typedef
  // async busqueda(){

  //   if (!this.bandera) {
  //     await this.consulta('alumnos/nombre/');
  //     await this.retardo(300);
  //   }
  //   if (!this.bandera) {
  //     await this.consulta('alumnos/apellido/');
  //     await this.retardo(300);
  //   }
  //   if (!this.bandera) {
  //     await this.consulta('alumnos/documento/');
  //     await this.retardo(300);
  //   }
  //   if (!this.bandera) {
  //     Swal.fire({ icon: 'warning', title: 'Error...', text: 'No se ha encontrado estudiante!' });
  //   }
  //   this.bandera = false;

  // }

  // consulta(ruta: string): void{
  //   this.crudServices.getModel( `${ruta}${this.entrada}`).subscribe(
  //     data => {
  //       if (JSON.stringify(data) !== '[]') {
  //         this.model = data;
  //         this.bandera = true;
  //       }
  //     }, (err) => {
  //       console.log('Error Interno' );
  //     }
  //     );
  // }

}
