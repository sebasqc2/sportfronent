import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import {EstudianteComponent} from './views/estudiante/estudiante.component';
const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  { path: 'estudiantes', component: EstudianteComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
