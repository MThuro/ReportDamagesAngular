import { ticket } from './../ticket';
import { Component, OnInit, Input } from '@angular/core';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { TicketService } from '../ticket.service';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  @Input() ticket: ticket;
  id: string;
  products = [
     'Product 1',
      'Product 2'];
  constructor(public router: Router, private route: ActivatedRoute, private ticketService: TicketService) { 
  }
  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    this.id = this.route.snapshot.paramMap.get('id');
    document.getElementById("headerTitel").innerText = "Ticket " + this.id;
    this.ticketService.getTicket(this.id).subscribe(ticket => this.ticket = ticket);
  }

}
