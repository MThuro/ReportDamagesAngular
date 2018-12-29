import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  constructor() { }


  ngOnInit() {
    document.getElementById("addButton").hidden = false;
    document.getElementById("headerTitel").innerText = "Ticket List";
  }

}
