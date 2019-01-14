import { TicketService } from './../ticket.service';
import { FormControl } from '@angular/forms';
import { ticket } from './../ticket';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../mock-products';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  @Input() ticket: ticket;
  @Input() startdate: Date;
  id: string;
  products = PRODUCTS;
  startDateForm = new FormControl();
  endDateForm = new FormControl();
  productStatusForm = new FormControl();

  constructor(public router: Router, private route: ActivatedRoute, private ticketService: TicketService) { 
  }
  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    document.getElementById("deleteButton").hidden = false;
    this.id = this.route.snapshot.paramMap.get('id');
    document.getElementById("headerTitel").innerText = "Ticket " + this.id;
    document.getElementById("deleteButton").onclick = this.deleteTicket;
    this.ticketService.getTicket(this.id).subscribe(ticket => {
      this.ticket = ticket;
      this.startDateForm.setValue(ticket.startDate.toDate());
      this.endDateForm.setValue(ticket.endDate.toDate());
      if(ticket.ticketStatus = "Fixed"){
        document.getElementById("deleteButton").hidden = true;
        document.getElementById("update").hidden = true;
      }
      });
  }
  deleteTicket  = function(): void{
    debugger;
    this.router.navigateByUrl('/ticket-list');
  }
  update(startDate: Date, endDate: Date, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string): void{
    this.ticket.startDate = new Date(startDate);
    this.ticket.endDate = new Date(endDate);
    this.ticket.ticketStatus = ticketStatus;
    this.ticket.productStatus = productStatus;
    this.ticket.product = product;
    this.ticket.quantity = quantity;
    this.ticket.time = time;
    this.ticket.summary = summary;
    this.ticket.description = description;
    this.ticket.comments = comments;
    this.ticketService.updateTicket(this.id, this.ticket);
    this.router.navigateByUrl('/ticket-list');
  }
}
