import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { cursosInterface } from '../../shared/model/cursosInterface'
import { actividadInterface } from '../../shared/model/actividadInterface'
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.min.js'
import { ServiciobackService } from '../../shared/services/servicioback.service';
import { categoriasInterface } from 'src/app/shared/model/categoriasInterface';


@Component({
  selector: 'app-veractividadeslista',
  templateUrl: './veractividadeslista.component.html',
  styleUrls: ['./veractividadeslista.component.css']
})
export class VeractividadeslistaComponent implements OnInit {
  calendario: any;
  horainicioact: any;
  select: any;
  categoria: any;

  optionsDate: object = {
    format: "dddd mmmm yyyy",
    minDate: new Date()
  };

  optionsTime: object = {
    twelveHour: false
  };

  newActividad: actividadInterface = {
    curso: "",
    lugar: "",
    nombreactividad: "",
    fecha: new Date(),
    horainicio: "",
    duracion: 0,
    observaciones: ""
  };


  constructor(public servicio: ServiciobackService) { }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
    var elems = document.querySelectorAll('.datepicker');
    this.calendario = M.Datepicker.init(elems, this.optionsDate);
    var elems = document.querySelectorAll('.timepicker');
    this.horainicioact = M.Timepicker.init(elems, this.optionsTime);
    var elems1 = document.querySelectorAll('select');
    this.select = M.FormSelect.init(elems1);


  }

  guardarNuevaActividad(formulario: NgForm) {
    this.categoria = formulario.value.nombrecategoria;
    this.newActividad.curso = formulario.value.nombrecurso;
    this.newActividad.lugar = formulario.value.lugar;
    this.newActividad.nombreactividad = formulario.value.nombre;
    this.newActividad.observaciones = formulario.value.observaciones;
    this.newActividad.duracion = this.select[0].input.value;
    this.newActividad.fecha = this.calendario[0].date;
    this.newActividad.horainicio = this.horainicioact[0].time;
    /*if (this.cursoExistente) {
      M.toast({ html: 'Curso inexistente' })
      formulario.resetForm();
      return;
    }

    if (this.categoriaExistente) {
      M.toast({ html: 'Categoria inexistente' })
      formulario.resetForm();
      return;
    }*/
    console.log(this.newActividad);
    //llamar al metodo agregar
    //this.agregarActividad();
    formulario.resetForm();

  }

  agregarActividad() {
    this.servicio.agregarActividad("https://sportbackend-heroku.herokuapp.com/actividades", this.newActividad).subscribe(actividad => {
      console.log(actividad);
    });
  }

  cursoExistente() {
    this.servicio.obtenerCursos("kdsd").subscribe(arrayCursos => {
      arrayCursos.forEach(element => {
        if (element.nombreCurso === this.newActividad.curso) {
          return false;
        }
      });
    });


    return true;
  }

  categoriaExistente() {
    this.servicio.obtenerCategorias("kdsd").subscribe(arrayCategorias => {
      arrayCategorias.forEach(element => {
        if (element.nombreCategoria === this.categoria) {
          return false;
        }
      });
    });


    return true;
  }


}
