import { Observable } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { User } from './../user';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  users: User[];
  constructor(private apiService: ApiService, private router: Router, public snackbar: MatSnackBar,
    private navigationService: NavigationService) { }

  ngOnInit() {
    //set Navigation Status for different components
    this.navigationService.setLogoutStatus(false);
    this.navigationService.setDeleteStatus(false);
    this.navigationService.setAddStatus(false);
    this.navigationService.setTicketListStatus(false);
    this.navigationService.setLoginStatus(false);
    this.navigationService.setHeaderTitle("Damage Report");
  }

  login(username: string, password: string): void {
    //check mandatory fields 
    if(!username || !password){
      this.snackbar.open("Please enter your username and password", "Dismiss",{
        duration: 2000,
      });
      return;
    }
    //get token from warehouse system
    let success = this.apiService.getToken({ username, password } as User);
    if(success=true){
      //save username and date to local storage
      localStorage.setItem("username", username);
      localStorage.setItem("logon", "true");
      localStorage.setItem("Date", JSON.stringify(new Date()));
      this.router.navigateByUrl('/ticket-list');
    } else{
      this.snackbar.open("The username or password is not correct", "Dismiss",{
        duration: 2000,
      });
      return;
    }
  };
}
