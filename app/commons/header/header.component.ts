import { Component, OnInit } from '@angular/core';
import { AppConfiguration } from 'src/app/utiles/app.initialization.conf';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public fecha: string;
  private dia: any;
  private mes: any;
  constructor(public appConf: AppConfiguration) {
  }
  ngOnInit() {
    console.log(' header fecha');
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
    if (dd < 10) {
      this.dia = '0' + dd;
    } else {
      this.dia = dd;
    }
    if (mm < 10) {
      this.mes = '0' + mm;
    } else {
      this.mes = mm;
    }
    this.fecha =  this.dia + ' - ' + this.mes + ' - ' + yyyy;
    }
}
