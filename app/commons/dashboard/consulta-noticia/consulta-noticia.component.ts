import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticias } from 'src/app/model/Noticias.model';
import { TipoNoticia } from 'src/app/model/TipoNoticia.model';
import { ResponseDTO } from 'src/app/response/ResponseDTO.model';
import { ResponseNoticias } from 'src/app/response/responseNoticias.model';
import { AlertService } from 'src/app/servicios/alert.service';
import { ApiService } from 'src/app/servicios/api.service';
import { ConstantesMsg } from 'src/assets/constantesMsg';
import { AdministracionService } from '../AdministracionService.service';

@Component({
  selector: 'app-consulta-noticia',
  templateUrl: './consulta-noticia.component.html',
  styleUrls: ['./consulta-noticia.component.css']
})
export class ConsultaNoticiaComponent implements OnInit  {
  public loading: boolean;
  public ocultarModal: boolean;
  public responseDTO : ResponseDTO;
  // public resultado: Array<CatNoticias> = [];
  public resultadoTipoNoticia: Array<TipoNoticia> = [];
  public reponseNoticias: ResponseNoticias;
  public resultado : any = []; 
  public lstCmbMunicipios = [];
  
  public eliminarNoticia: TipoNoticia;
  public lstTipoNoticia: Noticias;
  public tipoNoticia : Array<TipoNoticia>;

  public lstCmbTipoNoticia : any = [];
  public selectTipoNoti: string;


    // VAIABLES PARA EL PAGINADOR DE LA TABLA DE RESULTADOS
    public multiplosPaginador: number[] = [10, 15, 20];
    public numeroRegistrosPagina: number = this.multiplosPaginador[0];
    public paginas: any [] = [];
    public numeroPaginas: number;
    public numeroPaginaActual: number;
    public paginaActual: any = []; 

  ngOnInit() {
  }
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    public servicios : AdministracionService) {
      this.loading = true;
      this.alertService.error('OCURRIO UN ERROR AL OBTENER LA INFORMACION DEL ARCHIVO', null, null);
      // this.onEmpCreate();
      this.cargaCmbTipoNoticia(); 
      this.selectTipoNoti = "-1";
      this.loading = false;
      this.cargaCmbMunicipiosTlax();
  }

  consultaNoticia() {
    console.log(' INICIA METODO PARA LA TABLA');
    this.loading = true;
    try {
      if(this.selectTipoNoti != '-1'){      
      this.servicios.getNoticiaTipo(this.selectTipoNoti).subscribe(response => {      
        if(response !=undefined  && response.status == 200) {       
            this.reponseNoticias = response.body;
            // this.resultado = response.body;          
            if(Array.isArray(this.reponseNoticias.resultado) && this.reponseNoticias.resultado.length) { 
                this.resultadoTipoNoticia = this.reponseNoticias.resultado[0].tipoNoticia;
                
                if(Array.isArray(this.resultadoTipoNoticia) && this.resultadoTipoNoticia.length) { 
                  // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
                  this.cargaLstTabla();           
                  this.alertService.success('EXITO EN LA CONSULTA', '','');
                } else {
                  this.limpiarConsulta();
                  this.loading = false;
                  this.alertService.info('NO SE ENCONTRO INFORMACION CON EL CAMPO', null, null);
                }                
                this. cleanMessageTime (6000);
            } else {
              this.limpiarConsulta();
            this.loading = false;
            this.alertService.info('NO SE ENCONTRO INFORMACION CON EL CAMPO', null, null);
            this. cleanMessageTime (6000);
          }  
        }else {
          this.limpiarConsulta();
          this.loading = false;
          this.alertService.error('OCURRIO UN ERROR AL OBTENER LA INFORMACION', null, null);
          this. cleanMessageTime (6000);
        }      
        this.loading = false;
    },
    err => {
      this.limpiarConsulta();
      this.alertService.error('OCURRIO UN ERROR AL OBTENER LA INFORMACION', "", null);
      this. cleanMessageTime (6000);
      this.loading = false;
    });
  } else {
    this.alertService.error('DEBE SELECCIONAR UN CRITERIO DE CONSULTA', '', '');
    this.loading = false;
  }
    } catch (error) {
      this.alertService.error('OCURRIO UN ERROR AL OBTENER LA INFORMACION', "", null);
      console.log(error);
      this.loading = false;
    }
  }

  cleanMessageTime (time : number){
    setTimeout(() => {
      this.alertService.clearMessage();
    }, time);
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
  limpiarConsulta() {
    this.numeroPaginas = 0;
    this.numeroPaginaActual = 0;
    this.paginaActual = [];
    this.paginas = [];
    this.reponseNoticias = new ResponseNoticias;
    this.resultadoTipoNoticia = [];
    }

    limpiar() {
      this.limpiarConsulta();
      this.selectTipoNoti = "-1";
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
      this.numeroPaginas = Math.ceil(this.resultadoTipoNoticia.length/this.numeroRegistrosPagina);
      if (this.paginas.length > 0) {
        this.paginas = [];
      }
      for (let i = 0; i < this.resultadoTipoNoticia.length; i++) {
        pagina.push(this.resultadoTipoNoticia[i]);
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
      estatusConvert(searchVal) {
        for (let i = 0; i < this.lstCmbMunicipios.length; i++) {
          const currentEst = this.lstCmbMunicipios[i];
          if (currentEst.id === searchVal) {
            return currentEst.valor;
          }
        }
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

      enviaMsjEliminar(result: TipoNoticia) {
      console.log("enviaMsjEliminar");
      this.tipoNoticia = Array<TipoNoticia>();
        this.eliminarNoticia = result;
        this.ocultarModal = true;
          // this. eliminarRegistro();
     }
     ocultarModalOut(){
      console.log("ocultarModalOut"); 
      this.ocultarModal = false;
    }    
     eliminarRegistro(): void {
      console.log("eliminarRegistro");
      this.ocultarModal = false;
      this.lstTipoNoticia = new Noticias();      
      this.lstTipoNoticia.id =this.selectTipoNoti;
        this.tipoNoticia.push(this.eliminarNoticia);
      this.lstTipoNoticia.tipoNoticia = this.tipoNoticia;
      this.servicios.eliminarNoticia(this.lstTipoNoticia).subscribe(res => {
         this.responseDTO = res;
        if(this.responseDTO.operacion =='1') { 
          this.eliminarNoticiaLst();                  
          // INVOCA LA FUNCION PARA EL PAGINADO EN LA TABLA DE RESULTADO
          this.cargaLstTabla();
          this.alertService.success(ConstantesMsg.SUCCESS_ELIMINA_NOTICIA, null, '');
          this. cleanMessageTime (5000);
        } else {
          this.alertService.error(ConstantesMsg.ERROR_ELIMINAR_REGLA, '', null);
          this. cleanMessageTime (5000);
        }
      });
    }

    eliminarNoticiaLst(){
      console.log("Borra registro tabla")
      this.removeItemFromArr( this.resultadoTipoNoticia, this.eliminarNoticia );
    }
  
    removeItemFromArr ( array, item ) {
      var i = array.indexOf( item ); 
      if ( i !== -1 ) {
        array.splice( i, 1 );
      }
  }  

  cargaLstTabla () {
    this.resetPaginado();              
          this.cargarDatosTabla();
          this.paginaActual = this.paginas[this.numeroPaginaActual];
          if (this.selectTipoNoti == 'municipios') {
              for (let i = 0; i < this.paginaActual.length; i++) {
                  let tipoDesc = this.estatusConvert(this.paginaActual[i].tipo);
                  this.paginaActual[i].tipo = tipoDesc;
              }
          } 

  }
}

