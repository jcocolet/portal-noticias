import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Alert2Component } from './alert2/alert2.component';
import { LoadingComponent } from './loading/loading.component';;
@NgModule({
  declarations: [
    LoadingComponent,
    Alert2Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoadingComponent,
    Alert2Component
  ],
  providers: [ ]
})
export class ComponentesComunesModulo { }