export class AppConfiguration {
  public menubar = {
    menus:
      [
        {
          menuNombre: 'administracion', link: 'administracion',
          subMenus:
            [
              { nombre: 'loginApp', link: 'loginApp' },
              { nombre: 'centroNot', link: 'centroNot' },
             { nombre: 'mialcancia', link: 'mialcancia' }
            ]
       },
       {
        menuNombre: 'reportes', link: 'reportes',
       subMenus:
           [
             {nombre: 'jsonToExcel', link: 'jsonToExcel'}
           ]
      }
      ]
  };
}
