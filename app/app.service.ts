import { Injectable } from '@angular/core';
import { ApiService } from './servicios/api.service';

@Injectable()
export class AppService {
  public Object: any = {};
    constructor(private api: ApiService) {
    }


}
