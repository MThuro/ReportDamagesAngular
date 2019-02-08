import { AngularFireStorage } from 'angularfire2/storage';
import { map, count } from 'rxjs/operators';
import { Ticket } from './ticket';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ticketCount } from './ticketCount';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketCollection: AngularFirestoreCollection<Ticket>;
  private ticketDocument: AngularFirestoreDocument<Ticket>;
  private ticketCountDocument: AngularFirestoreDocument<ticketCount>;
  tickets: Observable<Ticket[]>;
  ticketsNew: Observable<Ticket[]>;
  ticketsProgress: Observable<Ticket[]>;
  ticketsFixed: Observable<Ticket[]>;
  ticketID: string;
  count: ticketCount;
  constructor(private afs: AngularFirestore) {
    this.ticketCollection = afs.collection<Ticket>('tickets');
   }
  
  //get all tickets with status New
  getNewTickets(): Observable<Ticket[]>{
    let ticketsNewRef = this.afs.collection<Ticket>('tickets', ref => ref.where('ticketStatus', '==', "New"));
    this.ticketsNew = ticketsNewRef.snapshotChanges().pipe(map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as Ticket;
        const id = a.payload.doc.id;
        return {id, ...data};
         });
        }));
    return this.ticketsNew;
  }

  //get all tickets with status In Progress
  getTicketsInProgress(): Observable<Ticket[]>{
    let ticketsProgressRef = this.afs.collection<Ticket>('tickets', ref => ref.where('ticketStatus', '==', "In Progress"));
    this.ticketsProgress = ticketsProgressRef.snapshotChanges().pipe(map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as Ticket;
        const id = a.payload.doc.id;
        return {id, ...data};
         });
        }));
    return this.ticketsProgress;
  }

  //get all tickets with status fixed
  getTicketsFixed(): Observable<Ticket[]>{
    let ticketsFixedRef = this.afs.collection<Ticket>('tickets', ref => ref.where('ticketStatus', '==', "Fixed"));
    this.ticketsFixed = ticketsFixedRef.snapshotChanges().pipe(map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as Ticket;
        const id = a.payload.doc.id;
        return {id, ...data};
         });
        }));
    return this.ticketsFixed; 
  }

  //add ticket to Firebase database
  addTicket(ticket: Ticket){
    //get logged on user
    ticket.user = localStorage.getItem("username");
    this.ticketCollection.doc(ticket.id).set(ticket);
    
  }

  //get ticket from database
  getTicket(id: string): Observable<Ticket>{
    this.setTicketID(id);
    this.ticketDocument = this.ticketCollection.doc(id);
    return this.ticketDocument.valueChanges();
  }

  //update changes to database
  updateTicket(id: string, ticket: Ticket): void{
    this.ticketCollection.doc(id).update(ticket);
  }

  //delete ticket from database
  deleteTicket(): void{
    this.ticketCollection.doc(this.ticketID).delete();
  }

  //set current ticketID
  setTicketID(id:string): void{
    this.ticketID = id;
  }

  //get currenct ticket count
  getTicketCount(): Observable<ticketCount>{
    this.ticketCountDocument = this.ticketCollection.doc("ticket_count");
    return this.ticketCountDocument.valueChanges();
  }
  updateTicketCount(count: ticketCount){
    debugger;
    this.ticketCollection.doc("ticket_count").update(count);
  }

}

