import { TicketListComponent } from './ticket-list/ticket-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent},
  { path: 'customers', component: CustomersComponent  },
  { path: 'ticket-list', component: TicketListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
