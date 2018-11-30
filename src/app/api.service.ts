import { User } from './user';
import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const API_URL = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(    private http: HttpClient ) {
    
   }

   public getToken(user: User): Observable<User>{
      debugger;
      return this.http.post<User>(API_URL, user, httpOptions).pipe(
        tap((user: User) => console.log(user.username)),
        catchError(this.handleError<User>('getToken'))
      );
   }

   private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
