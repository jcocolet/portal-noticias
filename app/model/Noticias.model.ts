import { TipoNoticia } from "./TipoNoticia.model";
export class Noticias {
    constructor(
      public id?: string,
      public tipoNoticia?: Array<TipoNoticia>
    ) {}
  }