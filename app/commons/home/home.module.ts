import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RoutinHomegModule } from './home.routing';
import { ComponentesComunesModulo } from '../common.module';
import { AppTranslationModule } from 'src/app/app.translation.module';
import { ConsultaNoticiaComponent} from '../dashboard/consulta-noticia/consulta-noticia.component';
import { AltaNoticiaComponent } from '../dashboard/alta-noticia/alta-noticia.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministracionService } from '../dashboard/AdministracionService.service';
import { ApiService } from 'src/app/servicios/api.service';
import { EliminarNoticiaComponent } from '../dashboard/eliminar-noticia/eliminar-noticia.component';
import { DetalleNoticiaComponent } from '../dashboard/detalleNoticia/detalle-noticia.component';

@NgModule({
  declarations: [
  	HomeComponent,
  	HeaderComponent,
    FooterComponent,
    ConsultaNoticiaComponent,
    AltaNoticiaComponent,
    EliminarNoticiaComponent,
    DetalleNoticiaComponent
  ],
  exports : [
    HomeComponent,
  	HeaderComponent,
    FooterComponent,
    ConsultaNoticiaComponent,
    AltaNoticiaComponent,
    EliminarNoticiaComponent,
    DetalleNoticiaComponent 
  ],
  imports: [
    CommonModule,
    RoutinHomegModule,
    ComponentesComunesModulo,
    AppTranslationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AdministracionService,ApiService]
})
export class HomeModule { }
