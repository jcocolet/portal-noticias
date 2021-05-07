import { CatImagen } from "./CatImagen.modelo";

export class TipoNoticia {
    constructor(
      public versId?: string,
      public tipo?: string,
      public img?: any,
      public nombreImgUrl?: string,
      public tituloNoticia?: string,
      public resumen?: string,
      public redaccion?: string,
      public fechaPublicacion?: string,
      public lstNombreImg?: Array<CatImagen>
    ) {}
  }