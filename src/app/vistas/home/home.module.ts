import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutingModule } from './home.routing';

import { HomeComponent } from './home.component';
import { AppTranslationModule } from 'src/app/app.translation.module';
import { AdministracionComponent } from './administracion/admin-vista/administracion.component';
import { FooterComponent } from '../../commons/footer/footer.component';
import { HeaderComponent } from '../../commons/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesComunesModulo } from 'src/app/commons/common.module';

@NgModule({
  declarations: [
  	HomeComponent,
  	HeaderComponent,
    FooterComponent,
    AdministracionComponent
  ],
  imports: [
    CommonModule, RoutingModule, AppTranslationModule, FormsModule, ReactiveFormsModule, ComponentesComunesModulo

  ],
  providers: []
})
export class HomeModule { }
