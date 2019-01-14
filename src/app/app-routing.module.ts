import { TicketListComponent } from './ticket-list/ticket-list.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'user-login', component: UserLoginComponent},
  { path: 'customers', component: CustomersComponent  },
  { path: 'ticket-list', component: TicketListComponent},
  { path: 'ticket-detail/:id', component: TicketDetailComponent},
  { path: 'ticket-creation/:customer', component: TicketCreationComponent},
  { path: 'user-logout', component: UserLogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
