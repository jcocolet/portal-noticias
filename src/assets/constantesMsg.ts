export class ConstantesMsg {
  public static ERROR_USUARIO_VACIO: any = 'Debe ingresar el usuario';
  public static ERROR_CONTRASENIA_VACIO: any = 'Debe ingresar la contraseña';
  public static ERROR_USUARIO_CONTRASENIA_VACIO: any = 'Debe ingresar el usuario y contraseña';
  public static ERROR_USUARIO_CONTRASENIA: any = 'Error al autentificar el usuario y/o contraseña ingresadas, porfavor de validar';


    public static ERROR_PARAMETROS_VACIO: any = 'Debe ingresar un criterio para realizar búsqueda.';
    public static ERROR_DELETE: any = 'Ocurrió un error al eliminar el registro seleccionado.';
    public static ERROR_CLAVE_VACIO: any = 'El campo clave no puede ser vacio.';
    public static ERROR_CLAVE_EXISTE: any = 'La clave capturada ya existe en la base de datos.';
    public static ERROR_CLAVE: any = 'La clave no debe contener caracteres inválidos.';
    public static ERROR_DESCRIPCION_VACIO: any = 'El campo descripción no puede ser vacio.';
    public static ERROR_DESCRIPCION_EXISTE: any = 'La descripción capturada ya existe en la base de datos.';
    public static ERROR_DESCRIPCION: any = 'La descripción no debe contener caracteres inválidos.';
    public static ERROR_CAMPOS_VACIOS: any = 'Los campos con * son obligatorios, por favor de validar.';
    public static ERROR_CAPTURA: any = 'Error al capturar la información, por favor de validar.';
    public static ERROR_EXISTE: any = 'La clase de crédito ya existe en la base de datos.';
    public static ERROR_CATALOGO_VACIO: any = 'Debe seleccionar un catálogo para la búsqueda.';
    public static ERROR_EXISTENMAS: any = 'Error al actualizar la información, existe más de una descripción en el catálogo.';
    public static ERROR_CAMPO_CLAVE_MIN: any = 'La clave debe tener mayor a 1 carácter, para realizar la búsqueda.';
    public static ERROR_CAMPO_DESC_MIN: any = 'La descripción debe ser mayor a 5 carácteres, para realizar la búsqueda.';
    public static ERROR_CATALOGO_CAPTURA_VACIO: any = 'Debe seleccionar un catálogo para la captura';
    public static ERROR_CAPTURA_CLAVE_MIN: any = 'La clave debe tener mayor a 1 carácter, para realizar la captura.';
    public static ERROR_CAPTURA_DESC_MIN: any = 'La descripción debe ser mayor a 5 carácteres, para realizar la captura.';
    public static ERROR_CAMBIO_ESTATUS_CATALOGOS: any = 'Es responsable quien actualicé el estatus a Inactivo o Depurar,'
     + ' al hacer esta actualización, se perderá toda relación existente en la reglas existentes en el sistema.'
     + ' Toda acción queda registrado y será auditado.';
    public static ERROR_ACTUALIZA_GENERAL: any = 'Ocurrió un error al actualizar la información.';
    public static ERROR_INSERTAR_GENERAL: any = 'Ocurrió un error al guardar la información en la base de datos.';
    public static ERROR_DESCRIPCION_TAMANIO: any = 'El campo descripción debe ser mayor a cuatro carácteres.';
    public static INFO_DETALLE_SIN_RESULTADO: any = 'No se encontró el detalle con el registro seleccionado.';
    public static INFO_BUSQUEDA_SIN_RESULTADO: any = 'No se encontró datos con el(los) criteríos ingresados.';
    public static INFO_SIN_CAMBIOS: any = 'No se encontró cambios que actualizar con la información de captura.';

    public static SUCCESS_CLONACION_REGLA: any = 'Se realizó la clonación de la regla';
    public static SUCCESS_CORRECTAMENTE: any = ' correctamente.';
    public static SUCCESS_CREACION_MATRIZ: any = 'Se realizó la generación de la matriz de reglas de manera correcta.';
    public static SUCCESS_CREACION: any = 'Se realizó la creación de los datos de manera correcta.';
    public static SUCCESS_ACTUALIZAR: any = 'Se realizó la modificación de manera correcta.';
    public static SUCCESS_LECTURA_ARCHIVO: any = 'Se realizó la lectura de información de manera correcta.';

    public static SELECCION: any = 'SELECCIONE...';
    public static SUCCES_MODIFICA_REGLA: any = 'Se modificó correctamente.';
    public static MSN_ERROR_AGREGAR: any = 'Debe ingresar todos los campos para agregar un registro.';
    public static MSN_ERROR_PARAMETROS: any = 'Verifique todos los parámetros.';
    public static SUCCES_MOD_ADMONPF: any = 'Se realizó la modificación de manera correcta.';
    public static MSN_ELIMINAR_REGISTRO: any = '¿Está seguro de eliminar el registro seleccionado?';
    public static ERROR_CAMPOS_VACIOS_MATRIZ: any = 'Debe seleccionar los campos obligatorios.';
    public static SUCCESS_DELETE: any = 'Se realizó la eliminación correctamente.';
    public static SUCCESS_AGREGAR: any = 'Se ha agregado satifactoriamente.';
    public static SUCCESS_OPERATION: any = 'Operación realizada con exito.';
    public static ERROR_500: any = 'Ocurrió un error al realizar la petición solicitda.';
    public static SUCCESS_CLONADO: any = 'Perfil clonado con exito';
    public static SUCCESS_BAJA: any = 'Perfil dado de baja con exito';
    public static SUCCESS_ELIMINA: any = 'Perfil eliminado con exito';

    public static ERROR_GUARDAR_CARGA_MASIVA: any = 'Error al realizar la carga masiva.';
    public static ERROR_ARCHIVO_VACIO: any = 'Debe seleccionar un archivo de carga.';
    public static ERROR_TIPO_CATALOGO_VACIO: any = 'Debe seleccionar el tipo de catálogo.';
    public static SUCCES_CARGA_PROCESANDO: any = 'Se realiza la carga de informacion de manera correcta.';

}
