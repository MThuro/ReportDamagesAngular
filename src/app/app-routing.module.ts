import { TicketListComponent } from './ticket-list/ticket-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent},
  { path: 'customers', component: CustomersComponent  },
  { path: 'ticket-list', component: TicketListComponent},
  { path: 'ticket-detail', component: TicketDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
