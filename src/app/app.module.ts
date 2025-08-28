import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NumerosComponent } from './components/numeros/numeros.component';
import { NbStepperModule } from '@nebular/theme';
import { NbCardModule } from '@nebular/theme';
import { NbThemeModule, NbLayoutModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
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
    NbStepperModule,
    NbCardModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
