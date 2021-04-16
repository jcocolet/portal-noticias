export class ResponseDTO {
  constructor(
    public codigoOperacion?: string,
    public descripcion?: string,
    public folio?: string,
    public tokenCode?: string,
    public responseWS?: string
  ) {}
}
