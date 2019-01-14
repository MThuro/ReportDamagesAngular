import { environment } from './../environments/environment.prod';

import { Component } from '@angular/core';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Report Maintenance Requirements'

  constructor(private router: Router) { }

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
    if(localStorage.getItem("logon") == "true"){
      this.router.navigateByUrl("/ticket-list");
    }else{
      this.router.navigateByUrl("/user-login");
    }
    let id = localStorage.getItem("id");
    if(id == null){
      localStorage.setItem("id", JSON.stringify(0));
    }
  }
}
