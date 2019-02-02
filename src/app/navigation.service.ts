import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  showLogin: boolean = false;
  showLogout: boolean = false;
  showTicketList: boolean = false;
  showAdd: boolean = false;
  showDelete: boolean = false;
  headerTitle: string;

  constructor() { }

  setLoginStatus(status: boolean){
    this.showLogin = status;
  }

  getLoginStatus(): boolean{
    return this.showLogin;
  }

  setLogoutStatus(status: boolean){
    this.showLogout = status;
  }

  getLogoutStatus(): boolean{
    return this.showLogout;
  }

  setTicketListStatus(status: boolean){
    this.showTicketList = status;
  }

  getTicketListStatus(): boolean{
    return this.showTicketList;
  }

  setAddStatus(status: boolean){
    this.showAdd = status;
  }

  getAddStatus(): boolean{
    return this.showAdd;
  }

  setDeleteStatus(status: boolean){
    this.showDelete = status;
  }

  getDeleteStatus(): boolean{
    return this.showDelete;
  }
  
  setHeaderTitle(title: string){
    this.headerTitle = title;
  }

  getHeaderTitle(): string{
    return this.headerTitle;
  }
  
}
