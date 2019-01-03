import { environment } from './../environments/environment.prod';

import { Component } from '@angular/core';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Report Maintenance Requirements'

  constructor() { }

  ngOnInit() {
    firebase.initializeApp(environment.firebase);
  }
}
