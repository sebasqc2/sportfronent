import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioModel} from '../../shared/model/usuario.model';
import {AuthService} from '../../shared/services/auth.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  login( form: NgForm ) {

    if (  form.invalid ) { return; }
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe( resp => {
        console.log(resp);

        Swal.close();
        localStorage.setItem('email', this.usuario.email);
        this.router.navigateByUrl('/estudiantes');
      }, (err) => {
        console.log(err.error.message[0].messages[0].message);
        Swal.fire({
          title: 'Error al autenticar',
          text: err.error.error.message,
          icon: 'error'
        });
      });

  }




}
