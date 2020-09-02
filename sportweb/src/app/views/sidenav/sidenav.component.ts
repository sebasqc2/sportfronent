import { Component, OnInit } from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.min.js';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  usuario: string = localStorage.getItem('usuario');
  rol: string = localStorage.getItem('rol');
  validador: boolean;
  constructor() { }

  ngOnInit(): void {
    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems);
    if (this.rol === 'administrador') {
      this.validador = true;
    }
  }
}
