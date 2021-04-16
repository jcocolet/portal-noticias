import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AlertService } from 'src/app/servicios/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public restService: AppService, public router: Router, private route: ActivatedRoute,private alertService: AlertService) {    
  }
  ngOnInit() {
  }
}
