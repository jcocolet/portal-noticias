import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { CatImagen} from 'src/app/model/CatImagen.modelo';
import { Noticias } from 'src/app/model/Noticias.model';
import { TipoNoticia } from 'src/app/model/TipoNoticia.model';
import { ResponseDTO } from 'src/app/response/ResponseDTO.model';
import { AlertService } from 'src/app/servicios/alert.service';
import { ConstantesMsg } from 'src/assets/constantesMsg';
import { AdministracionService } from '../AdministracionService.service';

@Component({
  selector: 'app-alta-noticia',
  templateUrl: './alta-noticia.component.html',
  styleUrls: ['./alta-noticia.component.css']
})
export class AltaNoticiaComponent implements OnInit {
public loading: boolean;
public ocultarModal: boolean;
public lstCmbTipoNoticia = [];
public selectTipoNoti: string;
public responseDTO : ResponseDTO;
public msjEliminar: string;
  public msjEliminarTitulo: string;
// VISTA MAS DE UNO
public activa_redaccion: boolean;
public activa_lbl_titulo_nota: boolean;
public activa_lbl_resumen: boolean;
public activa_lbl_file : boolean;
public nombreImagen : string;
public base64textString : any;

//VARIABLES VISTA LOCAL
public activa_cmb_local: boolean;
public cmbSelectLocal: string;
public lstCmbLocal = [];

//VARIABLE VISTA MUNICIPIO
public activa_cmb_municipios: boolean;
public cmbSelectMunicipio: string;
public lstCmbMunicipios = [];
public catImagen : CatImagen;
public lstImagenes: Array<CatImagen> = [];
@ViewChild('inputFile')
public myInputFileImagen: ElementRef;

// VARIABLES VISTA SEGURIDAD
public activa_cmb_seguridad: boolean;
public cmbSelectSeguridad: string;
public lstCmbSeguridad = [];

// VARIABLE VIDEOS VIRALES
public activa_lbl_url : boolean;
public lblUrlVideosVirales: string;
public format: any;
public url : any;
public activa_lbl_url_alta: boolean;




  // VAIABLES PARA EL PAGINADOR DE LA TABLA DE RESULTADOS
  public multiplosPaginador: number[] = [10, 15,20];
  public numeroRegistrosPagina: number = this.multiplosPaginador[0];
  public paginas: any [] = [];
  public numeroPaginas: number;
  public paginaActual: any = [];
  public numeroPaginaActual: number;


  public noticia: TipoNoticia;
  public lstTipoNoticia: Noticias;
  public tipoNoticia : Array<TipoNoticia>;



  constructor(public fb: FormBuilder,
    private alertService: AlertService,
    public servicios : AdministracionService) {
      console.log("selecciona constructor");
      this.loading = true;      
      this.cargaCmbTipoNoticia(); 
      this.selectTipoNoti = "-1";
      this.noticia = new  TipoNoticia(); 
    this.loading = false;
    this.base64textString = undefined;
  }

  ngOnInit() {
    console.log("selecciona ngOnInit");
    this.loading = true;      
    this.cargaCmbTipoNoticia(); 
    this.activaVistaInicio();
    this.selectTipoNoti = "-1";
    this.cmbSelectLocal = '-1';
    this.cmbSelectMunicipio = '-1';
    this.cmbSelectSeguridad = '-1';
  }

  changeSelect($event): void{
    console.log("selecciona evento");
    console.log("selecciona evento" + this.selectTipoNoti);
    var selectBox = (<HTMLInputElement>event.target).value
    this.activaCmbUno (this.selectTipoNoti)
  }
  detalleAlta(){
    this.loading = false;
    this.alertService.error('OCURRIO UN ERROR AL OBTENER LA INFORMACION DEL ARCHIVO', null, null);
    
  }
  publicarNoticia() {
    console.log(' INICIA METODO GUARDAR NOTICIA');
    this.tipoNoticia = Array<TipoNoticia>();
    
    this.lstTipoNoticia = new Noticias();
    this.loading = true;
    this.lstTipoNoticia.id =this.selectTipoNoti;
    this.noticia.img = this.base64textString;
    if(this.activa_cmb_municipios) {
      this.noticia.lstNombreImg = this.lstImagenes;
    } else if (this.activa_lbl_url) {
      this.noticia.nombreImgUrl = this.lblUrlVideosVirales;
    } 
    // else {
    //   this.noticia.nombreImgUrl = this.nombreImagen;
    // }    
    this.noticia.tipo = this.addTipo();
    this.noticia.versId =  this.generarID ();
    this.tipoNoticia.push(this.noticia);
    this.lstTipoNoticia.tipoNoticia = this.tipoNoticia;
    if(!this.isValidaDatosBusqueda()){
      this.loading = false;
      this.alertService.warn('NO SE PERMITEN CAMPOS SIN CAPTURAR', null, null);
      this. cleanMessageTime (5000);
      return;
    }

    this.servicios.guardarNoticia(this.lstTipoNoticia).subscribe(response => {
      console.log(response);
      this.responseDTO = response;
        if(this.responseDTO.operacion =='1') { 
        // this.resultado = response.body['resultado'];
        console.log(response);
        this.alertService.success('SE DIO DE ALTA CORRECTAMENTE', '','');        
        this. cleanMessageTime (5000);
        this.activaSeleccione();
        this.loading = false;
      }else {
        this.loading = false;
        this.alertService.error('OCURRIO UN ERROR AL GUARDAR LA INFOMRACIÓN', null, null);
      }      
      this.loading = false;
  },
  err => {
    console.log(err);
    this.loading = false;
    this.alertService.error('OCURRIO UN ERROR AL GUARDAR LA INFOMRACIÓN', null, null);
  });
  }

  generarID () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return '_' + Math.random().toString(36).substr(2, 9);

  }

  addTipo () {
    let tipo = undefined;
    if (this.selectTipoNoti == 'local'){
      tipo = this.cmbSelectLocal;
    }
        
    if (this.selectTipoNoti == 'municipios') {
      tipo = this.cmbSelectMunicipio;
    }
    if (this.selectTipoNoti == 'seguridad') {
      tipo = this.cmbSelectSeguridad;
    }    
    return tipo;
  }

  isValidaDatosBusqueda(): Boolean {
    console.log('INICIA LA FUNCION PARA VALIDAR LOS DATOS DE BUSQUEDA');
    let nombrelstUrlImagen: any;
    let lblresumen : any;
    if(this.activa_cmb_municipios) {
      if(Array.isArray(this.lstImagenes) && this.lstImagenes.length) {
        nombrelstUrlImagen = 'ok'; 
      }
    } else if (this.activa_lbl_url) {
      nombrelstUrlImagen = this.lblUrlVideosVirales;
    } else if(this.base64textString === '' ||
      this.base64textString === undefined ){
        nombrelstUrlImagen = '';
      } else {
        nombrelstUrlImagen = this.noticia.nombreImgUrl;
      }

      if(this.activa_lbl_resumen){

        if(this.noticia.resumen === '' ||
            this.noticia.resumen === undefined) {
            lblresumen = '';
        }    
      }
      

    if (this.noticia.tituloNoticia === '' ||
    this.noticia.tituloNoticia === undefined ||     
      this.selectTipoNoti === '-1' ||
      nombrelstUrlImagen === undefined ||
      nombrelstUrlImagen === '' || 
      lblresumen == '') {
      return false;
    } else {
      return true;
    }

   

  }

  onSelectFile(file: File) {
    if(this.activa_cmb_municipios) {
      this.nombreImagen = file.name;
    } else {
      this.noticia.nombreImgUrl =  file.name;
    }   
    var reader = new FileReader();
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log(btoa(binaryString));
   }

   addLstPictures(){
    console.log('agrega imagenes a una lista')
    this.loading = true;
    this.alertService.clearMessage();
    // this.activa_lbl_url_alta = true;
    if(this.isNullEmpty(this.base64textString)){
      let catImagen = new CatImagen(); 
      catImagen.img = this.base64textString;
      catImagen.nombreImgUrl = this.nombreImagen   
      if(this.isNotExistListURI(this.base64textString)){
        this.lstImagenes.push(catImagen);
        this.base64textString = "";
        this.nombreImagen = undefined;
        this.myInputFileImagen.nativeElement.value = "";
         this.resetPaginado();
          // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
         this.cargarDatosTabla();
          this.paginaActual = this.paginas[this.numeroPaginaActual];
          this.alertService.info('SE AGREGA IMAGEN CORRECTAMENTE', ' ',' ');
          this. cleanMessageTime (5000);
          this.loading = false;
      } else {
        this.alertService.error('NO SE PUEDE CARGAR LA MISMA IMAGEN', ' ',' ');
        this.base64textString = "";
        this.nombreImagen = undefined;
        this.myInputFileImagen.nativeElement.value = "";
        this. cleanMessageTime (5000);
        this.loading = false;
        
      }  
    } else {
      this.alertService.error('DEBE INGESAR UNA IMAGEN VALIDA', ' ',' ');
      this.base64textString = "";
        this.nombreImagen = undefined;
        this.myInputFileImagen.nativeElement.value = "";
        this. cleanMessageTime (5000);
        this.loading = false;
    }

      
  }
  cleanMessageTime (time : number){
    setTimeout(() => {
      this.alertService.clearMessage();
    }, time);
  }
  
  eliminarImagenLst(index: number,select:CatImagen){
    console.log("Borra registro tabla")
    let indice = index;
    this.removeItemFromArr( this.paginaActual, select );
  }

  removeItemFromArr ( array, item ) {
    var i = array.indexOf( item ); 
    if ( i !== -1 ) {
      array.splice( i, 1 );
    }
}


  isNotExistListURI(lblUrlVideosVirales: string): boolean{
  let isValid : boolean;
  isValid = true;
    this.paginaActual.forEach(element => {
      if(element.uri == lblUrlVideosVirales)
      isValid = false;
    });
    return isValid;
  }



  activaCmbUno (selectTipoNoti){
switch (selectTipoNoti) {
  case "-1":
    this.activaSeleccione();
    break;
  case "inicio":
      this.activaVistaInicio();
    break;
  case "local":
    this.activaVistaLocal();
    break;
      
  case "municipios":
    this.activaVistaMunicipio();
    break;
  
  case "seguridad":
      this.activaVistaSeguridad();
      break;  
  
  case "videos_virales":
      this.activaVistaVideosVirales();
      break;  
  
  case "noticias_momento":
      this.activaVistaNoticasMomento();
      break;
      
  case "avisos":
      this.activaVistaAvisos();
      break;
      
  case "anuncios":
      this.activaVistaAnuncios();
      break;   
  default:
    this.activaVistaInicio();
    break;
}
  }
  activaSeleccione(){
    this.activa_cmb_local = false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;
    this.activa_lbl_titulo_nota = true;

    this.activa_lbl_file = true;
    this.activa_lbl_resumen = true;
    
    this.activa_redaccion = false;
    this.selectTipoNoti = "-1";
    this.noticia = new  TipoNoticia();
    this.base64textString = "";
    this.nombreImagen = undefined;
    if(!this.activa_lbl_url){
      this.myInputFileImagen.nativeElement.value = "";
    }
    this.activa_lbl_url = false;
    this.lblUrlVideosVirales = undefined;
    
  }

  activaVistaInicio(){
    this.activa_cmb_local = false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;
    this.activa_lbl_titulo_nota = true;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_lbl_resumen = true;
    
    this.activa_redaccion = false;
    this.loading = false;
    
  }

  activaVistaLocal(){
    this.loading = true;

    this.activa_cmb_local= true;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;
    this.activa_lbl_titulo_nota = true;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_lbl_resumen = true;
    this.activa_redaccion = true;

    // this.cargaCmbLocal();
    this.cmbSelectLocal = '-1';

    this.loading = false;
  }

  activaVistaMunicipio(){
    this.loading = true;
    this.activa_cmb_local= false;
    this.activa_cmb_municipios = true;
    this.activa_cmb_seguridad = false;
    this.activa_lbl_titulo_nota = true;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_lbl_resumen = true;
    this.activa_redaccion = true;
    this.cargaCmbMunicipiosTlax();
    this.cmbSelectMunicipio = '-1';
    this.loading = false;
  }

  activaVistaSeguridad(){
    this.loading = true;
    this.activa_cmb_local= false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = true;
    this.activa_lbl_titulo_nota = true;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_lbl_resumen = true;
    this.activa_redaccion = true;
    this.loading = false;
    this.cargaCmbSeguridad();
    this.cmbSelectSeguridad = '-1';

  }

  activaVistaVideosVirales(){
    this.activa_cmb_local= false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;
    this.activa_lbl_titulo_nota = true;
    this.activa_lbl_resumen = true;
    this.activa_lbl_file = false;
    this.activa_lbl_url = true;
    this.activa_redaccion = false;

    this.activa_lbl_url_alta = true;
  }

  activaVistaNoticasMomento(){
    this.activa_cmb_local= false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;

    this.activa_lbl_titulo_nota = true;
    this.activa_lbl_resumen = true;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_redaccion = true;
  }

  activaVistaAvisos(){
    this.activa_cmb_local= false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;

    this.activa_lbl_titulo_nota = true;
    this.activa_lbl_resumen = true;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_redaccion = false;
  }

  activaVistaAnuncios(){
    this.activa_cmb_local= false;
    this.activa_cmb_municipios = false;
    this.activa_cmb_seguridad = false;

    this.activa_lbl_titulo_nota = true;
    this.activa_lbl_resumen = false;

    this.activa_lbl_file = true;
    this.activa_lbl_url = false;

    this.activa_redaccion = false;

  }

  cargaCmbTipoNoticia(){
    this.lstCmbTipoNoticia = [
      {id:"-1", valor:'Seleccione...'},
      {id:"inicio", valor:'Inicio'},
      {id:"local", valor:'Local'},
      {id:"municipios", valor:'Municipios'},
      {id:"seguridad", valor:'Seguridad'},
      {id:"videos_virales", valor:'Videos Virales'},
      {id:"noticias_momento", valor:'Noticias del Momento'},
      {id:"avisos", valor:'Avisos'},
      {id:"anuncios", valor:'Anuncios'}
    ];
  }

  cargaCmbLocal(){
    this.lstCmbLocal = [
      {id:'-1', valor:'Seleccione...'},
      {id:'Salud', valor:'Salud'},
      {id:'Congreso', valor:'Congreso'}
    ];
  }

  cargaCmbSeguridad(){
    this.lstCmbSeguridad = [
      {id:'-1', valor:'Seleccione...'},
      {id:'Seguridad', valor:'Seguridad'}
    ];
  }

  

  cargaCmbMunicipiosTlax(){
    this.lstCmbMunicipios = [
      {id:'-1', valor:'Seleccione...'},
      {id:'1', valor:'ACUAMANALA DE MIGUEL HIDALGO'},
      {id:'2', valor:'ATLTZAYANCA'},
      {id:'3', valor:'AMAXAC DE GUERRERO'},
      {id:'4', valor:'APETATITLAN DE ANTONIO CARVAJAL'},
      {id:'5', valor:'APIZACO'},
      {id:'6', valor:'ATLANGATEPEC'},
      {id:'7', valor:'BENITO JUÁREZ'},
      {id:'8', valor:'CALPULALPAN'},
      {id:'9', valor:'CHIAUTEMPAN'},
      {id:'10', valor:'CONTLA DE JUAN CUAMATZI'},
      {id:'11', valor:'CUAPIAXTLA'},
      {id:'12', valor:'CUAXOMULCO'},
      {id:'13', valor:'EL CARMEN TEQUEXQUITLA'},
      {id:'14', valor:'EMILIANO ZAPATA'},
      {id:'15', valor:'ESPAÑITA'},
      {id:'16', valor:'HUAMANTLA'},
      {id:'17', valor:'HUEYOTLIPAN'},
      {id:'18', valor:'IXTACUIXTLA DE MARIANO MATAMOROS'},
      {id:'19', valor:'IXTENCO'},
      {id:'20', valor:'LA MAGDALENA TLALTELULCO'},
      {id:'21', valor:'LÁZARO CÁRDENAS'},
      {id:'22', valor:'MAZATECOCHCO DE JOSÉ MARÍA MORELOS'},
      {id:'23', valor:'MUÑOZ DE DOMINGO ARENAS'},
      {id:'24', valor:'NANACAMILPA DE MARIANO ARISTA'},
      {id:'25', valor:'NATIVITAS'},
      {id:'26', valor:'PANOTLA'},
      {id:'27', valor:'PAPALOTLA DE XICOHTÉNCATL'},
      {id:'28', valor:'SAN DAMIÁN TEXOLOC'},
      {id:'29', valor:'SAN FRANCISCO TETLANOHCAN'},
      {id:'30', valor:'SAN JERÓNIMO ZACUALPAN'},
      {id:'31', valor:'SAN JOSÉ TEACALCO'},
      {id:'32', valor:'SAN JUAN HUACTZINCO'},
      {id:'33', valor:'SAN LORENZO AXOCOMANITLA'},
      {id:'34', valor:'SAN LUCAS TECOPILCO'},
      {id:'35', valor:'SAN PABLO DEL MONTE'},
      {id:'36', valor:'SANCTORUM DE LÁZARO CÁRDENAS'},
      {id:'37', valor:'SANTA ANA NOPALUCAN'},
      {id:'38', valor:'SANTA APOLONIA TEACALCO'},
      {id:'39', valor:'SANTA CATARINA AYOMETLA'},
      {id:'40', valor:'SANTA CRUZ QUILEHTLA'},
      {id:'41', valor:'SANTA CRUZ TLAXCALA'},
      {id:'42', valor:'SANTA ISABEL XILOXOXTLA'},
      {id:'43', valor:'TENANCINGO'},
      {id:'44', valor:'TEOLOCHOLCO'},
      {id:'45', valor:'TEPETITLA DE LARDIZÁBAL'},
      {id:'46', valor:'TEPEYANCO'},
      {id:'47', valor:'TERRENATE'},
      {id:'48', valor:'TETLA DE LA SOLIDARIDAD'},
      {id:'49', valor:'TETLATLAHUCA'},
      {id:'50', valor:'TLAXCALA'},
      {id:'51', valor:'TLAXCO'},
      {id:'52', valor:'TOCATLÁN'},
      {id:'53', valor:'TOTOLAC'},
      {id:'54', valor:'TZOMPANTEPEC'},
      {id:'55', valor:'XALOZTOC'},
      {id:'56', valor:'XALTOCAN'},
      {id:'57', valor:'XICOHTZINCO'},
      {id:'58', valor:'YAUHQUEMECAN'},
      {id:'59', valor:'ZACATELCO'},
      {id:'60', valor:'ZITLALTEPEC DE TRINIDAD SÁNCHEZ SANTOS'}

    ];
  }

  isNullEmpty(cadena: string): boolean{
    let isValid : boolean;
    isValid = true;
      if(cadena == null || cadena == '')
      isValid = false;
    return isValid;  
  }
   // EVENTO QUE SE ENCARGA DE VALIDAR DATOS ESPECIALES
  soloCaracteres(evt): void {
    const regEx = /^([A-Z])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }
  // EVENTO QUE SE ENCARGA DE VALIDAR CAPTURA SOLO NUMEROS
  soloCaracteresClave(evt): void {
    const regEx = /^([¡!-,´¿?A-Z0-9a-z ])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }
   // EVENTO QUE SE ENCARGA DE VALIDAR SOLO NUMEROS
   soloNumeros(evt): void {
    const regEx = /^([0-9])$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }
   // EVENTO QUE SE ENCARGA DE VALIDAR SOLO NUMEROS
   validaURLyoutube(evt): void {
    const regEx = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/;
    if (!regEx.test(evt.key)) {
      evt.preventDefault();
    }
  }

  limpiar() {
    this.resetPaginado();
    }

    clearFile() {
      var inputValue = (<HTMLInputElement>document.getElementById('inputGroupFile04')).value = '';
      this.base64textString = undefined;
    }
    /*FUNCION QUE SE ENCARGA DE QUITAR EL MENSAJE DE ALERTA */
    clearMessage = () => {
      this.alertService.clearMessage();
    }
    /*FUNCION QUE SE ENCARGA DE LA ACCION DE SIGUIENTE PAGUINA DEL PAGINADO */
    siguientePagina() {
      console.log('INICIA EL EVENTO PAGINA SIGUIENTE');
      this.numeroPaginaActual++;
      this.paginaActual = this.paginas[this.numeroPaginaActual];
    }
    paginaAnterior() {
      console.log('INICIA EL EVENTO PAGINA ANTERIOR');
      this.numeroPaginaActual--;
      this.paginaActual = this.paginas[this.numeroPaginaActual];
    }
    establecerRegistrosMostrar(evento) {
      this.numeroRegistrosPagina = parseInt(evento.target.value, 10);
      this.cargarDatosTabla();
      this.numeroPaginaActual = 0;
      this.paginaActual = this.paginas[this.numeroPaginaActual];
    }
    cargarDatosTabla() {
      console.log('INICIA EL EVENTO CARGA DATOS A LA TABLA');
      let pagina = [];
      let contador = 0;
      this.numeroPaginas = Math.ceil(this.lstImagenes.length/this.numeroRegistrosPagina);
      if (this.paginas.length > 0) {
        this.paginas = [];
      }
      for (let i = 0; i < this.lstImagenes.length; i++) {
        pagina.push(this.lstImagenes[i]);
        contador++;
        if(contador === this.numeroRegistrosPagina) {
          this.paginas.push(pagina);
          contador = 0;
          pagina = [];
          console.log('contador' + pagina);
          continue;
        }
      }
      if (pagina.length < this.numeroRegistrosPagina) {
          this.paginas.push(pagina);
      }
    }
    resetPaginado () {
      // Regresa si la pagina esta vacía o va a la siguiente pagina si es la primera la que esta vacía
        this.numeroPaginas = 0;
        this.numeroPaginaActual = 0;
        this.paginaActual = [];
        this.paginas = [];
      }

      detalleNoticia(){
        this.ocultarModal = true;
      }
      ocultarModalOut(){
        this.ocultarModal = false;

      }

         
}

