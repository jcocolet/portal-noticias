import { Injectable } from '@angular/core';
import { Constants } from 'src/app/utiles/constants';
import { ApiService } from 'src/app/servicios/api.service';
import { Noticias } from 'src/app/model/Noticias.model';

@Injectable()
export class AdministracionService {
  url: string;
  public valor: string;

  //VARIABLE VISTA MUNICIPIO
public activa_cmb_municipios: boolean;
public cmbSelectMunicipio: number;
public lstCmbMunicipios = [];

  constructor(private api: ApiService) {}
//     getNotiLocal(params?: any) {
//         console.log(' INICIA METODO PARA LA TABLA');
//       return this.http.get(this.url + Constants.URL_CONSULTA_NOTICIAS_LOCAL);
//   }
    getNotiLocal() {
        return this.api.get(Constants.URL_CONSULTA_NOTICIAS_LOCAL);
    
    }

    getNoticiaTipo(getNoticiaTipo : string) {
      return this.api.get(Constants.URL_CONSULTA_NOTICIAS_TIPO + getNoticiaTipo,getNoticiaTipo);
  
  }
    guardarNoticia(request: Noticias) {
      return this.api.post(Constants.URL_GUARDAR_NOTICIAS_LOCAL, request);
    }
    eliminarNoticia(request: Noticias) {
      return this.api.post(Constants.URL_DELETE_NOTICIAS_TIPO, request);
    }
// getMensajes(param: RequestLoginTO) {
//   return this.api.post(Constants.URL_CONSULTA_MENSAJES_CLIENTES, param, null).map(res => res.json());
// }
}