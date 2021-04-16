import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './servicios/api.service';
import { Constants } from './utiles/constants';
import { AppConfiguration } from './utiles/app.initialization.conf';
import { AlertService } from './servicios/alert.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { NavigationAuthGuardService} from './navigationAuthGuard.service';
import { RoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './vistas/home/home.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ComponentesComunesModulo } from './commons/common.module';
import {MatRadioModule} from '@angular/material/radio';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RoutingModule,
    HomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    ComponentesComunesModulo
  ],
  providers: [
    ApiService,
    Constants,
    AppConfiguration,
    AlertService,
    AppService,
    NavigationAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
