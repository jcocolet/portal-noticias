import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';

@Injectable()
export class NavigationAuthGuardService implements CanActivate {
  private encontroCoin: boolean;
  constructor(public restService: AppService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      console.log('canActivate');
      return this.encontroCoin = true;
    }
}