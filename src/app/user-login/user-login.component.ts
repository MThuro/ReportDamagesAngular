import { Observable } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';
import { User } from './../user';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  debugger;
  users: User[];
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    if(!username || !password){
      return;
    }
    let success = this.apiService.getToken({ username, password } as User);
    debugger;
    if(success=true){
      this.router.navigateByUrl('/ticket-list');
    }
  };
}
