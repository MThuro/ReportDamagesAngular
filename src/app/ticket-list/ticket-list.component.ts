import { ticket } from './../ticket';
import { Component, OnInit } from '@angular/core';
import { TicketService } from './../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ticketsNew : ticket[];
  ticketsProgress: ticket[];

  constructor(private ticketService: TicketService) { }


  ngOnInit() {
    document.getElementById("addButton").hidden = false;
    document.getElementById("headerTitel").innerText = "Ticket List";
    this.getTickets();
  }

  getTickets(): void{
    this.ticketService.getNewTickets()
    .subscribe(tickets => this.ticketsNew = tickets);
    this.ticketService.getTicketsInProgress()
    .subscribe(tickets=> this.ticketsProgress = tickets);
  }
}
