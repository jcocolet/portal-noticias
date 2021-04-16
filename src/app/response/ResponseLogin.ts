import { ResponseDTO } from './ResponseDTO';


export class ResponseLogO extends ResponseDTO {
  constructor(
    public  infoRealHash?: string,
    public  telefono?: string,
    public  hasToken?: boolean,
    public  isMigrated?: boolean,
    public  changeMobile?: boolean,
    public  isMobile?: boolean,
    public  isCodigo?: boolean,
    public  needFD?: boolean,
    public  needExt?: boolean,
    public  nombre?: string,
    public  apePaterno?: string,
    public  apeMaterno?: string,
    public  respFolio?: string,
    public  idRechazo?: string,
    public  descRechazo?: string,
    public  hasMC?: boolean,
    public  repFlow?: number,
    public  step?: number,
    public  isPreactivated?: boolean,
    public  needPRenew?: boolean,
    public  hasCtePreAut?: boolean,
    public  isComercio?: boolean,
    public  isAsesorDigital?: boolean,
    public  icu?: string,
    public  tokenSincronizado?: boolean,
    public  tipoCliente?: string,
    public  lastLogin?: string,
    public  hasVoiceKaralundi?: boolean,
    public  compDomValid?: boolean,
    public  docOficialValid?: boolean,
    public fechaNacimiento?: string

  ) {
    super();
  }
}
