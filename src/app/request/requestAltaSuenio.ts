import { CatPeriodicidad } from '../model/catPeriodicidad.model';

export class RequestAltaSuenio {
  public peri: CatPeriodicidad  = new CatPeriodicidad();
  constructor(
    public nombreSuenio?: string,
    public montoParaSuenio?: string,
    public fechaCumplimiento?: string,
    public periodicidad?: string,
    public fechaContratacion?: string
  ) {
    // this.peri = new CatPeriodicidad();
    // this.peri.nombre = 'SEMANAL';
    // this.peri.clave = 'SM';
    // this.peri.descipcion = 'PARA AUTOMATICOSS SEMANALES';
    // this.peri.estatus = 'A';

    // this.periodicidad.push(this.peri);
    // this.peri = new CatPeriodicidad();
    // this.peri.nombre = 'QUICENAL';
    // this.peri.clave = 'QN';
    // this.peri.descipcion = 'PARA AUTOMATICOSS QUINCENAL';
    // this.peri.estatus = 'A';
    // this.periodicidad.push(this.peri);
    // this.peri = new CatPeriodicidad();
    // this.peri.nombre = 'MENSUAL';
    // this.peri.clave = 'MS';
    // this.peri.descipcion = 'PARA AUTOMATICOSS MENSUAL';
    // this.peri.estatus = 'A';
    // this.periodicidad.push(this.peri);
    // this.periodicidad.forEach(a => console.log(a.nombre));
    }
}
