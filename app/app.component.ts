import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container pt-3">
      <router-outlet></router-outlet>
  </div>`,
  providers: []
})

export class AppComponent {
  constructor() {
  }

}


