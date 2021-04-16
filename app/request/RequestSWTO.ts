export class RequestSWTO {
  constructor(
    public pathContexto?: string,
    public pathWS?: string,
    public requestWS?: string,
    public cookie?: string,
    public tokenCode?: string,
    public aplicacion?: string,
    public timeStamp?: string,
    public ip?: string
  ) {
    this.timeStamp = '202002290827';
    this.aplicacion = 'Android-9-2155';
    this.requestWS = '{"aplicacion":"IOS-12.0.1-5.7159.0091","timeStamp":"158264469515938","tokenCode":"50c122d3d0452ffd9513bc7d00503aca"}';
    this.pathWS = '/api/bdm/alcancia/v1/deseos/busquedas';
  }
}
