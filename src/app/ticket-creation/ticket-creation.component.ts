import { PRODUCTS } from './../mock-products';
import { TicketService } from './../ticket.service';
import { Component, OnInit } from '@angular/core';
import { ticket } from '../ticket';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Customer } from '../customer';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-ticket-creation',
  templateUrl: './ticket-creation.component.html',
  styleUrls: ['./ticket-creation.component.css']
})
export class TicketCreationComponent implements OnInit {
  products = PRODUCTS;
  dateForm = new FormControl();
  date = new Date();
  customer: Customer = new Customer(); 
  constructor(private ticketService: TicketService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    document.getElementById("deleteButton").hidden = true;
    document.getElementById("headerTitel").innerText = "Create new Ticket";
    this.dateForm.setValue(this.date);
    this.customer.id = this.route.snapshot.paramMap.get('customer');
  }

  save(startDate: Date, endDate: Date, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string, customer: string): void {
      debugger;
      customer = this.customer.id;
      let ticket: ticket = {
        id: "",
        creationDate: new Date(),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ticketStatus: ticketStatus,
        productStatus: productStatus,
        product: product,
        quantity: quantity,
        time: time,
        summary: summary,
        description: description,
        comments: comments,
        customer: customer };

      this.ticketService.addTicket(ticket);
      this.router.navigateByUrl("/ticket-list");
  };
}
