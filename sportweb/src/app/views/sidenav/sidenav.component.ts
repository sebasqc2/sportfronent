import { Component, OnInit } from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.min.js'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    
  }
}
