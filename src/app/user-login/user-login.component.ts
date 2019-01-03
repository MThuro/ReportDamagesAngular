import { Observable } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { User } from './../user';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  users: User[];
  constructor(private apiService: ApiService, private router: Router, public snackbar: MatSnackBar) { }

  ngOnInit() {
    document.getElementById("addButton").hidden = true;
    document.getElementById("headerTitel").innerText = "Report Damages";
  }

  login(username: string, password: string): void {
    if(!username || !password){
      this.snackbar.open("Please enter your username and password", "Dismiss",{
        duration: 2000,
      });
      return;
    }
    let success = this.apiService.getToken({ username, password } as User);
    if(success=true){
      this.router.navigateByUrl('/ticket-list');
    }
  };
}