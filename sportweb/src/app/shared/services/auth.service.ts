import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../../shared/model/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // http://localhost:1337/auth/local
  private url ='http://localhost:1337/auth/local'


  constructor(private http: HttpClient ) {
    this.logout()
   }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuario');

  }

  login( usuario: UsuarioModel ) {
    const authData = {
      identifier: usuario.email,
      password: usuario.password
    };

    return this.http.post(
      `${ this.url }`, authData
    ).pipe(
      map(resp =>{
        this.guardarDatos( resp['jwt'], resp['user'].username , resp['user'].role.name);
        return resp;
      })
    );
  }

  private guardarDatos(token: string, username: string, role: string){
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', username);
    localStorage.setItem('rol', role);

  }

  isAuth():boolean{
    if (localStorage.getItem('token')) {
      return true;
    }else{
      return false;
    }
  }

}

