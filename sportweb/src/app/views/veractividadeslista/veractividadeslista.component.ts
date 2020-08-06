import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cursosInterface } from '../../shared/model/cursosInterface';
import { actividadInterface } from '../../shared/model/actividadInterface';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';
import { ServiciobackService } from '../../shared/services/servicioback.service';
import { categoriasInterface } from 'src/app/shared/model/categoriasInterface';
import { Element } from '@angular/compiler';


@Component({
  selector: 'app-veractividadeslista',
  templateUrl: './veractividadeslista.component.html',
  styleUrls: ['./veractividadeslista.component.css']
})
export class VeractividadeslistaComponent implements OnInit {
  calendario: any;
  horainicioact: any;
  selectduracion: any;
  selectcategoria: any;
  selectcurso: any;
  datosCursos: any;

  optionsDate: object = {
    format: 'dddd mmmm yyyy',
    minDate: new Date()
  };

  optionsTime: object = {
    twelveHour: false
  };

  optionsSelectcursos: object = {
    dropdownOptions: {
      onCloseEnd: () => {
        console.log(this.selectcurso.input.value);
        // document.querySelector('#selectCategoria').innerHTML = this.obtenerNombresCategorias(this.selectcurso.input.value);
        const elems5 = document.querySelector('#selectCategoria');
        this.selectcategoria = M.FormSelect.init(elems5);
      }
    }
  }

  newActividad: actividadInterface = {
    categoria: '',
    lugar: '',
    nombreactividad: '',
    fecha: new Date(),
    horainicio: '',
    duracion: 0,
    observaciones: ''
  };

  constructor(public servicio: ServiciobackService) {

  }

  ngOnInit(): void {
    this.obtenerdatoscursos();
    const elems1 = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems1);
    var elems2 = document.querySelectorAll('.datepicker');
    this.calendario = M.Datepicker.init(elems2, this.optionsDate);
    var elems3 = document.querySelectorAll('.timepicker');
    this.horainicioact = M.Timepicker.init(elems3, this.optionsTime);
    var elems4 = document.querySelector('#selectDuracion');
    this.selectduracion = M.FormSelect.init(elems4);
    //document.querySelector('#selectCurso').innerHTML = this.obtenerNombresCursos();
    var elems6 = document.querySelector('#selectCurso');
    this.selectcurso = M.FormSelect.init(elems6,this.optionsSelectcursos);
  }

  guardarNuevaActividad(formulario: NgForm) {
    //this.categoria = formulario.value.nombrecategoria;
    this.newActividad.categoria = this.selectcategoria.input.value;
    this.newActividad.lugar = formulario.value.lugar;
    this.newActividad.nombreactividad = formulario.value.nombre;
    this.newActividad.observaciones = formulario.value.observaciones;
    this.newActividad.duracion = this.selectduracion.input.value;
    this.newActividad.fecha = this.calendario[0].date;
    this.newActividad.horainicio = this.horainicioact[0].time;
    //console.log(this.newActividad);
    //llamar al metodo agregar
    //this.agregarActividad();
    formulario.resetForm();

  }

  agregarActividad() {
    this.servicio.agregarActividad("https://sportbackend-heroku.herokuapp.com/actividades", this.newActividad).subscribe(actividad => {
      if (actividad){
        console.log(actividad);
        M.toast({html: 'Actividad agregada con exito'})
      }
    });
  }

  // tslint:disable-next-line: typedef
  obtenerdatoscursos() {
    this.servicio.obtenerCursos("https://sportbackend-heroku.herokuapp.com/deportes").subscribe(arrayCursos => {

     this.datosCursos = Object.values(arrayCursos);
      console.log(this.datosCursos);
    });
  }

  obtenerNombresCursos(){
    let cadena = '<option value="" disabled selected>selecciona el curso</option>';
    this.datosCursos.forEach(element => {
      cadena = cadena + '<option value="'+element.NOMBRE+'">'+element.NOMBRE+'</option>';
    });
    return cadena;
  }

  obtenerNombresCategorias(cursoelegido: string){
    let cadena = '<option value="" disabled selected>selecciona el curso</option>';
    this.datosCursos.forEach(element => {
      if(cursoelegido === element.NOMBRE){
        element.categorias.forEach(element2 => {
          cadena = cadena + '<option value="'+element2.NOMBRE_CATEGORIA+'">'+element.NOMBRE_CATEGORIA+'</option>';
        });
      }
    });
    return cadena;
  }

  obtenercategorias() {
    this.servicio.obtenerCategorias("https://sportbackend-heroku.herokuapp.com/categorias").subscribe(arrayCategorias => {
      console.log(arrayCategorias);
    });


  }
}
