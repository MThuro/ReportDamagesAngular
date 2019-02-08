import { ApiService } from './../api.service';
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
import { ticketCount } from '../ticketCount';

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
  count: ticketCount;

  constructor(private ticketService: TicketService, private router: Router, 
    private route: ActivatedRoute, private afStorage: AngularFireStorage,
    public snackbar: MatSnackBar,
    private navigationService: NavigationService,
    private apiService: ApiService) { }

  ngOnInit() {
    //set Navigation Status for different components
    this.navigationService.setHeaderTitle("Create new Ticket");
    this.navigationService.setTicketListStatus(true);
    this.navigationService.setLoginStatus(false);
    this.navigationService.setLogoutStatus(true);
    this.navigationService.setAddStatus(false);
    this.navigationService.setDeleteStatus(false);
    //default start date to current date
    this.dateForm.setValue(this.date);
    //get selected customer
    this.customer.id = this.route.snapshot.paramMap.get('customer');
    //get ticket count
    this.ticketService.getTicketCount().subscribe( count =>{
      //get ticket counter and increase by one
      count.count = count.count + 1;
      this.count = count;
    }
    );
  }
  //save ticket data to database
  save(startDate: string, endDate, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string, customer: string): void {
      if(!startDate || !ticketStatus || !product || !summary || !quantity || !productStatus){
        this.snackbar.open("Please enter all mandatory fields", "Dismiss",{
          duration: 2000,
        });
        return;
      }
      if(ticketStatus == 'Fixed'){
        if(!endDate || !time){
          this.snackbar.open("Please enter an End Date and Time needed to change the ticket to status Fixed", "Dismiss",{
            duration: 3000,
          });
          return;
        }
      }
      if(endDate != ""){
        endDate = new Date(endDate);
      }
      customer = this.customer.id;
      let ticket: Ticket = {
       id: JSON.stringify(this.count.count),
       user: "",
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
      //increase ticket count
      this.ticketService.updateTicketCount(this.count);
      //send email to procurement department
      if(productStatus == 'Procured'){
        this.apiService.sendEmail(this.ticket);
      }
      this.router.navigateByUrl("/ticket-list");
  };
  //save file when new file is uploaded
  onFileChanged(event): void{
    this.selectedFile = event.target.files[0];
  }
  //upload File to Firebase Storage
  uploadFile(): void{
   let task = this.afStorage.upload(this.selectedFile.name, this.selectedFile).then(
     (result) => {
       //file has been added, hence save ticket
      let fileRef = this.afStorage.ref(this.selectedFile.name);
      fileRef.getDownloadURL().subscribe( url => {
        this.ticket.image = url;
        this.ticketService.addTicket(this.ticket);
      }
      )
     }
   )
  }
}
