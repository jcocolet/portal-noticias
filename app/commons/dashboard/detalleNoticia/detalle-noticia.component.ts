import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoNoticia } from 'src/app/model/TipoNoticia.model';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.css']
})
export class DetalleNoticiaComponent implements OnInit {
  @Input() public ocultarModal: boolean;
  @Input() public noticia: TipoNoticia;
  @Output() public eventOut = new EventEmitter();
 
  constructor() { }

  ngOnInit() {
  }

  regresar() {
    this.eventOut.emit();
  }
  cerrarModal(){
    this.ocultarModal = false;
    this.eventOut.emit();
  }
}