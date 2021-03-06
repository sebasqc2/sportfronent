import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { VeractividadeslistaComponent } from './views/veractividadeslista/veractividadeslista.component';
import { LoginComponent } from './views/login/login.component';
import {EstudianteComponent} from './views/estudiante/estudiante.component';
import {PagosComponent} from './views/pagos/pagos.component';
import { DocenteComponent } from './views/docente/docente.component';


const routes: Routes = [
  {path: 'home', component: AppComponent },
  {path: 'actividadesList', component: VeractividadeslistaComponent},
  { path: 'login'   , component: LoginComponent },
  { path: 'estudiantes', component: EstudianteComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'docentes', component: DocenteComponent },
  { path: '**', redirectTo: 'login' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
