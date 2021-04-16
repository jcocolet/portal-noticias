import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Alert, AlertType } from '../model/alert.model';

export class AlertMessage {
    public show: boolean;
    public message: string;
}

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clearMessage();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
    primary(message: string, message2: string,message3: string, keepAfterRouteChange = false) {
        this.clearMessage();
        this.alert(AlertType.Primary, message,message2,message3, keepAfterRouteChange);
    }
    success(message: string, message2: string,message3: string, keepAfterRouteChange = false) {
        this.clearMessage();
        this.alert(AlertType.Success, message, message2,message3, keepAfterRouteChange);
    }

    error(message: string, message2: string,message3: string, keepAfterRouteChange = false) {
        this.clearMessage();
        this.alert(AlertType.Error, message,message2,message3, keepAfterRouteChange);
    }

    info(message: string, message2: string,message3: string, keepAfterRouteChange = false) {
        this.clearMessage();
        this.alert(AlertType.Info, message,message2,message3, keepAfterRouteChange);
    }

    warn(message: string, message2: string,message3: string, keepAfterRouteChange = false) {
        this.clearMessage();
        this.alert(AlertType.Warning, message,message2,message3, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, message2: string,message3: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.clearMessage();
        this.subject.next(<Alert>{ type: type, message: message, message2: message2,message3:message3 });
    }

    clearMessage() {
        this.subject.next();
    }
}
