import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NumerosComponent } from './components/numeros/numeros.component';
import { ArtigosComponent } from './components/artigos/artigos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NumerosComponent,
    ArtigosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
