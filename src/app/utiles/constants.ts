export class Constants {

  // public URL = 'http://localhost:8083';
  public URL = 'http://10.95.69.113:8081/';
  public static URL_LOGIN_APP: string = '/bdm/api/v1/dologin';
  public static URL_CONSULTA_MENSAJES_CLIENTES: string = '/app/mensajes/getMensajes/';

  // CARGA MASIVA JSON TO EXCEL
  public static URL_REPORTE: string = '/api/getReporte/JCC.xlsx';
  public static POST_FILE: string = '/api/cargaMasiva/getJsonToExcel';

  // CALCULO DE SUENIO MI ALCANCIA
  public static POST_CALCULAR_SUENIO: string = '/api/calculo/suenio';
  public static URL_CONSULTAWS: string = '/bdm/api/v1/consulta';

}
