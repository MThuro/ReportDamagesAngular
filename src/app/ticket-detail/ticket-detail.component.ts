import { AngularFireStorage } from 'angularfire2/storage';
import { TicketService } from './../ticket.service';
import { FormControl } from '@angular/forms';
import { Ticket } from './../ticket';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PRODUCTS } from '../mock-products';


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
    private ticketService: TicketService, private afStorage: AngularFireStorage) { 
  }
  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    document.getElementById("deleteButton").hidden = false;
    this.id = this.route.snapshot.paramMap.get('id');
    document.getElementById("headerTitel").innerText = "Ticket " + this.id;
    this.ticketService.getTicket(this.id).subscribe(ticket => {
      this.ticket = ticket;
      this.startDateForm.setValue(ticket.startDate.toDate());
      this.endDateForm.setValue(ticket.endDate.toDate());
      if(ticket.ticketStatus == "Fixed"){
        document.getElementById("deleteButton").hidden = true;
        document.getElementById("update").hidden = true;
      }
      });
  }

  update(startDate: Date, endDate: string, ticketStatus: string, productStatus: string,
    product: string, quantity: number, time: number, summary: string, 
    description: string, comments: string): void{
    this.ticket.startDate = new Date(startDate);
    debugger;
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

  deleteImage(): void{
    this.oldURL = this.ticket.image;
    this.ticket.image = "";
  }

  onFileChanged(event): void{
    this.selectedFile = event.target.files[0];
  }
  
  uploadFile(): void{
    debugger;
    this.afStorage.upload(this.selectedFile.name, this.selectedFile);
    let fileRef = this.afStorage.ref(this.selectedFile.name);
    fileRef.getDownloadURL().subscribe( url => {
      debugger;
      this.ticket.image = url;
      this.ticketService.updateTicket(this.id, this.ticket);
    }
    )
   }
}
