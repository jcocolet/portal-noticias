export class RequestLoginTO {
constructor(
  public appId?: string,
  public  infoHashActivation?: string,
  public infoVer?: string,
  public isMobile?: boolean,
  public isQR?: boolean,
  public recuperaFD?: boolean,
  public  timeStamp?: string,
  public ubicacionGps?: number[],
  public username?: string,
  public aplicacion?: string,
  public password?: string,

  public ipServidor?: string,
  public pathContexto?: string
) {
  this.appId = 'mx.com.bancoazteca.bazdigitalmovil';
  this.infoHashActivation = 'kasdfofgh4567dfgh234cfsdfsdfsdfsdfw34';
  this.infoVer = '-1284761915';
  this.isMobile = false;
  this.isQR = false;
  this.recuperaFD = true;
  this.timeStamp = '202002290827';
  this.ubicacionGps = [ -99.1986302, 19.3340707];
  this.username = 'usuarioQA3';
  this.aplicacion = 'Android-9-2155';
  this.password = 'password1';
  this.ipServidor = '10.95.69.113';
  this.pathContexto = '/BancaDigitalMiddleware';
}
}
