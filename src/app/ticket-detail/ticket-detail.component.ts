import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  products = [
     'Product 1',
      'Product 2'];
  previousUrl: string;
  constructor(public router: Router) { 
  }
  ngOnInit() {
    debugger;
    document.getElementById("addButton").hidden = true;
    if(document.getElementById("headerTitel").innerText == "Select a Customer"){
      document.getElementById("headerTitel").innerText = "Create new Ticket";
    };
  }

  save(): void{

  };

}
