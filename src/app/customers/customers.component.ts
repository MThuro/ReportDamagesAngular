import { CUSTOMERS } from './../mock-customers';
import { Customer } from './../customer';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers = CUSTOMERS;
  constructor(){};


  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    document.getElementById("headerTitel").innerText = "Select a customer";
  }

}
