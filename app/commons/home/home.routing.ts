import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaNoticiaComponent } from '../dashboard/alta-noticia/alta-noticia.component';
import { ConsultaNoticiaComponent } from '../dashboard/consulta-noticia/consulta-noticia.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: 'consulta-noticias', component: ConsultaNoticiaComponent },
      { path: 'alta', component: AltaNoticiaComponent },
      { path: '', redirectTo: '/consulta-noticias', pathMatch:'full' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutinHomegModule { }
