import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavigationComponent } from './navigation/navigation.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { MaterialModule } from './material.module';
import { TicketCreationComponent } from './ticket-creation/ticket-creation.component';
import { AngularFireModule } from 'angularfire2';
import { UserLogoutComponent } from './user-logout/user-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    UserLoginComponent,
    TicketListComponent,
    NavigationComponent,
    TicketDetailComponent,
    TicketCreationComponent,
    UserLogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
