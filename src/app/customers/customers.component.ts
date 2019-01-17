import { CUSTOMERS } from './../mock-customers';
import { Customer } from './../customer';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers = CUSTOMERS;
  constructor(private navigationService: NavigationService){};


  ngOnInit() {
    this.navigationService.setHeaderTitle("Select a customer");
    this.navigationService.setAddStatus(false);
    this.navigationService.setDeleteStatus(false);
    this.navigationService.setTicketListStatus(true);
    this.navigationService.setLoginStatus(false);
    this.navigationService.setLogoutStatus(true);
  }

}
