import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-eliminar-noticia',
  templateUrl: './eliminar-noticia.component.html',
  styleUrls: ['./eliminar-noticia.component.css']
})
export class EliminarNoticiaComponent implements OnInit {
  @Input() public ocultarModal: boolean;
  @Output() public eventOut = new EventEmitter();
  @Output() public eventCancelar = new EventEmitter();
 
  constructor() { }

  ngOnInit() {
  }

  eliminar() {
    console.log("eliminar");
    this.eventOut.emit();
  }
  cancelarModal(){
    console.log("cancelarModal");
    this.ocultarModal = false;
    this.eventCancelar.emit();
  }
}
