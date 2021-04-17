import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './commons/home/home.component';
import { RoutinHomegModule } from './commons/home/home.routing';

const routes: Routes = [
  { path: '', redirectTo: '/consulta-noticias', pathMatch: 'full' },
  { path: '**' , redirectTo: '/consulta-noticias' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
  RoutinHomegModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
