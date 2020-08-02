import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component';
import { EstudianteComponent } from './estudiante/estudiante.component';

@NgModule({
  declarations: [
    AppComponent,
    EstudianteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
