import { PRODUCTS } from './../mock-products';
import { Product } from './../product';
import { Ticket } from './../ticket';
import { Component, OnInit } from '@angular/core';
import { TicketService } from './../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  products = PRODUCTS;
  ticketsNew : Ticket[];
  ticketsProgress: Ticket[];
  ticketsFixed: Ticket[];

  constructor(private ticketService: TicketService) { }


  ngOnInit() {
    document.getElementById("deleteButton").hidden = true;
    document.getElementById("addButton").hidden = false;
    document.getElementById("headerTitel").innerText = "Ticket List";
    this.getTickets();
  }

  getTickets(): void{
    this.ticketService.getNewTickets()
    .subscribe(tickets => this.ticketsNew = tickets);
    this.ticketService.getTicketsInProgress()
    .subscribe(tickets=> this.ticketsProgress = tickets);
    this.ticketService.getTicketsFixed()
    .subscribe(tickets=> this.ticketsFixed = tickets);
  }

  findProduct(id: string){
    let product = this.products.find(o => o.id === id);
    return product.description;
  }
}
