import { PRODUCTS } from './mock-products';
import { Ticket } from './ticket';
import { User } from './user';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { CUSTOMERS } from './mock-customers';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  products = PRODUCTS;
  customers = CUSTOMERS;

  constructor(    private http: HttpClient ) {
   }
   //get token based on supplied login data
   public getToken(user: User): boolean{
      this.http.post<User>(API_URL, user, httpOptions).pipe(
        tap((user: User) => console.log(user.username)),
        catchError(this.handleError<User>('getToken'))
      );
      //change according to successful request
      return true;
   }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
    public sendEmail(ticket: Ticket): void {
      //Send email to procurement department
          let product = this.products.find( x => x.id == ticket.product)
          let customer = this.customers.find( x => x.id == ticket.customer)
          let sendEmail = firebase.functions().httpsCallable('sendEmailHTTPS');
          sendEmail ({summary: ticket.summary, user: ticket.user,
                      product: product.description, startDate: ticket.startDate.toString(),
                      quantity: ticket.quantity, comments: ticket.comments,
                      description: ticket.description,
                      customer: customer.name,
                      image: ticket.image }).then(function(result) {
          }).catch(function(error) {
            // Getting the Error details.
            var code = error.code;
            var message = error.message;
            var details = error.details;
            console.log(code + message + details);
          });
    }
}
