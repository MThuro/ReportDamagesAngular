import { NavigationService } from './../navigation.service';
import { MatSnackBar } from '@angular/material';
import { PRODUCTS } from './../mock-products';
import { TicketService } from './../ticket.service';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../ticket';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Customer } from '../customer';
import { AngularFireStorage } from 'angularfire2/storage';

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
  selectedFile: File;
  downloadURL;
  ticket: Ticket;

  constructor(private ticketService: TicketService, private router: Router, 
    private route: ActivatedRoute, private afStorage: AngularFireStorage,
    public snackbar: MatSnackBar,
    private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.setHeaderTitle("Create new Ticket");
    this.dateForm.setValue(this.date);
    this.customer.id = this.route.snapshot.paramMap.get('customer');
  }

  save(startDate: string, endDate, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string, customer: string): void {
      if(!startDate || !ticketStatus || !product || !summary || !quantity){
        this.snackbar.open("Please enter all mandatory fields", "Dismiss",{
          duration: 2000,
        });
        return;
      }
      if(endDate != ""){
        endDate = new Date(endDate);
      }
      debugger;
      if(productStatus == undefined){
        productStatus = "";
      }
      customer = this.customer.id;
      let ticket: Ticket = {
       id: "",
       creationDate: new Date(),
       startDate: new Date(startDate),
       endDate: endDate,
       ticketStatus: ticketStatus,
       productStatus: productStatus,
       product: product,
       quantity: quantity,
       time: time,
       summary: summary,
       description: description,
       comments: comments,
       customer:  customer,
       image: "",
      };
      this.ticket = ticket;
      if(this.selectedFile == null){
        this.ticketService.addTicket(ticket);
      }else{
        this.uploadFile();
      }
      this.router.navigateByUrl("/ticket-list");
  };

  onFileChanged(event): void{
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void{
   debugger;
   let task = this.afStorage.upload(this.selectedFile.name, this.selectedFile);
   let fileRef = this.afStorage.ref(this.selectedFile.name);
   fileRef.getDownloadURL().subscribe( url => {
     debugger;
     this.ticket.image = url;
     this.ticketService.addTicket(this.ticket);
   }
   )
  }
}
