import { environment } from './../environments/environment.prod';

import { Component } from '@angular/core';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Report Maintenance Requirements'

  constructor(private router: Router, private swUpdate: SwUpdate) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('A newer version of the application is available. Load the new version ?')) {
          window.location.reload();
        }
      })};
    if (!firebase.apps.length) {
      //initialize firebase
      firebase.initializeApp(environment.firebase);
    }
    //if user has already logged on => navigate to ticket list directly
    if(localStorage.getItem("logon") == "true"){
      this.router.navigateByUrl("/ticket-list");
    }else{
      this.router.navigateByUrl("/user-login");
    }
  }
}
