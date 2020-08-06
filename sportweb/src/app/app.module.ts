import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EstudianteComponent } from './views/estudiante/estudiante.component';
import { LoginComponent } from './views/login/login.component';
import { AppComponent } from './app.component';
import { UsersComponent } from './views/users/users.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { SidenavComponent } from './views/sidenav/sidenav.component';
import { VeractividadeslistaComponent } from './views/veractividadeslista/veractividadeslista.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    FooterComponent,
    SidenavComponent,
    VeractividadeslistaComponent,
    EstudianteComponent,
    LoginComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
