import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard} from './shared/guards/auth.guard';
const routes: Routes = [
  { path: 'login'   , component: LoginComponent, canActivate : [ AuthGuard] },
  { path: 'home'   , component: HomeComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
