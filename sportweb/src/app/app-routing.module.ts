import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UsersComponent } from './views/users/users.component';
import { VeractividadeslistaComponent } from './views/veractividadeslista/veractividadeslista.component';


const routes: Routes = [
  {path: 'home', component: AppComponent },
  {path: 'users', component: UsersComponent},
  {path: 'actividadesList', component: VeractividadeslistaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
