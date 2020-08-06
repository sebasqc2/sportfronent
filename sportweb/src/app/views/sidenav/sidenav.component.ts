import { Component, OnInit } from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.min.js'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  usuario: string = localStorage.getItem('usuario');
  rol: string = localStorage.getItem('rol');
  constructor() { }

  ngOnInit(): void {
    let elems = document.querySelectorAll('.sidenav');
    let instances = M.Sidenav.init(elems);
  }
}
