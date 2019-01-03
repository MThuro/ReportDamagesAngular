import { TicketService } from './../ticket.service';
import { Component, OnInit } from '@angular/core';
import { ticket } from '../ticket';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.css']
})
export class TicketCreationComponent implements OnInit {
  products = [
    'Product 1',
     'Product 2'];
  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    document.getElementById("headerTitel").innerText = "Create new Ticket";
  }

  save(startDate: Date, endDate: Date, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string): void {
      let ticket: ticket = {
        id: "",
        creationDate: new Date(),
        startDate: startDate,
        endDate: endDate,
        ticketStatus: ticketStatus,
        productStatus: productStatus,
        product: product,
        quantity: quantity,
        time: time,
        summary: summary,
        description: description,
        comments: comments}

      this.ticketService.addTicket(ticket);
      this.router.navigateByUrl("/ticket-list");
  };
}
