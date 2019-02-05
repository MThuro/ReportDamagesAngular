import { MatSnackBar } from '@angular/material';
import { AngularFireStorage } from 'angularfire2/storage';
import { TicketService } from './../ticket.service';
import { FormControl } from '@angular/forms';
import { Ticket } from './../ticket';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../mock-products';
import { NavigationService } from '../navigation.service';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  @Input() ticket: Ticket;
  @Input() startdate: Date;
  id: string;
  products = PRODUCTS;
  startDateForm = new FormControl();
  endDateForm = new FormControl();
  productStatusForm = new FormControl();
  selectedFile: File;
  oldURL: string;

  constructor(public router: Router, private route: ActivatedRoute, 
    private ticketService: TicketService, private afStorage: AngularFireStorage,
    public snackbar: MatSnackBar, public navigationService: NavigationService) { 
  }
  ngOnInit() {
    //set Navigation Status for different components
    this.navigationService.setDeleteStatus(true);
    this.navigationService.setTicketListStatus(true);
    this.navigationService.setAddStatus(false);
    //get selected ticket id
    this.id = this.route.snapshot.paramMap.get('id');
    this.navigationService.setHeaderTitle("Ticket " + this.id);

    //get ticket data according to id
    this.ticketService.getTicket(this.id).subscribe(ticket => {
      debugger;
      this.ticket = ticket;
      this.startDateForm.setValue(ticket.startDate.toDate());
      if(ticket.endDate){
        this.endDateForm.setValue(ticket.endDate.toDate());
      };
      debugger;
      //if status is fixed, it shall not be possible to delete or update the ticket
      if(ticket.ticketStatus == "Fixed"){
        debugger;
        this.navigationService.setDeleteStatus(false);
        document.getElementById("update").hidden = true;
        document.getElementById("imageInput").hidden = true;
      }
      });
  }
  //update ticket with new data
  update(startDate: Date, endDate: string, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string): void{
    this.ticket.startDate = new Date(startDate);
    //check if all mandatory fields have been entered -> if not, show message
    if(!startDate || !ticketStatus || !product || !summary || !quantity){
      this.snackbar.open("Please enter all mandatory fields", "Dismiss",{
        duration: 2000,
      });
      return;
    }
    if(endDate != ""){
      this.ticket.endDate = new Date(endDate);
    }else{
      this.ticket.endDate = endDate;
    }
    this.ticket.ticketStatus = ticketStatus;
    this.ticket.productStatus = productStatus;
    this.ticket.product = product;
    this.ticket.quantity = quantity;
    this.ticket.time = time;
    this.ticket.summary = summary;
    this.ticket.description = description;
    this.ticket.comments = comments;
    //if new image has been added, update the link in the ticket
    if(this.ticket.image == "" && this.oldURL != undefined){
      this.afStorage.storage.refFromURL(this.oldURL).delete();
      this.oldURL = "";
    }
    if(this.selectedFile != null){
      this.uploadFile();
    }else{
      this.ticketService.updateTicket(this.id, this.ticket);
    };
    this.router.navigateByUrl('/ticket-list');
  }
  //delete image from Firebase Storage
  deleteImage(): void{
    this.oldURL = this.ticket.image;
    this.ticket.image = "";
  }
  //set selected file, in case new image has been uploaded
  onFileChanged(event): void{
    this.selectedFile = event.target.files[0];
  }
  //upload file to Firebase Storage
  uploadFile(): void{
    this.afStorage.upload(this.selectedFile.name, this.selectedFile).then(
      (result) => {
        let fileRef = this.afStorage.ref(this.selectedFile.name);
        fileRef.getDownloadURL().subscribe( url => {
          this.ticket.image = url;
          this.ticketService.updateTicket(this.id, this.ticket);
        }
        )
      }
    );
   }
}
