import { NavigationService } from './../navigation.service';
import { PRODUCTS } from './../mock-products';
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

  constructor(private ticketService: TicketService, private navigationService: NavigationService) { }


  ngOnInit() {
    //set Navigation Status for different components
    this.navigationService.setDeleteStatus(false);
    this.navigationService.setAddStatus(true);
    this.navigationService.setHeaderTitle("Ticket List");
    this.navigationService.setLogoutStatus(true);
    this.navigationService.setLoginStatus(false);
    this.navigationService.setTicketListStatus(false);
    //get all tickets
    this.getTickets();
  }

  getTickets(): void{
    //get tickets with status New
    this.ticketService.getNewTickets()
    .subscribe(tickets => this.ticketsNew = tickets);
    //get tickets with status In Progress
    this.ticketService.getTicketsInProgress()
    .subscribe(tickets=> this.ticketsProgress = tickets);
    //get tickets with status Fixed
    this.ticketService.getTicketsFixed()
    .subscribe(tickets=> this.ticketsFixed = tickets);
  }
  //get corresponding product description
  findProduct(id: string){
    let product = this.products.find(o => o.id === id);
    return product.description;
  }
}
