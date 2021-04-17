import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './servicios/api.service';
import { Constants } from './utiles/constants';
import { AppConfiguration } from './utiles/app.initialization.conf';
import { AlertService } from './servicios/alert.service';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { NavigationAuthGuardService} from './navigationAuthGuard.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './commons/home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule
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
