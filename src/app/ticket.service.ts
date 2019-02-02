import { AngularFireStorage } from 'angularfire2/storage';
import { map } from 'rxjs/operators';
import { Ticket } from './ticket';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketCollection: AngularFirestoreCollection<Ticket>;
  private ticketDocument: AngularFirestoreDocument<Ticket>;
  tickets: Observable<Ticket[]>;
  ticketsNew: Observable<Ticket[]>;
  ticketsProgress: Observable<Ticket[]>;
  ticketsFixed: Observable<Ticket[]>;
  ticketID: string;
  constructor(private afs: AngularFirestore) {
    this.ticketCollection = afs.collection<Ticket>('tickets');
   }

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
  
  addTicket(ticket: Ticket){
    let id = JSON.parse(localStorage.getItem("id"));
    id = id + 1;
    localStorage.setItem("id", id);
    ticket.id = JSON.stringify(id);
    this.ticketCollection.doc(ticket.id).set(ticket);
  }

  getTicket(id: string): Observable<Ticket>{
    this.setTicketID(id);
    this.ticketDocument = this.ticketCollection.doc(id);
    return this.ticketDocument.valueChanges();
  }

  updateTicket(id: string, ticket: Ticket): void{
    this.ticketCollection.doc(id).update(ticket);
  }

  deleteTicket(): void{
    this.ticketCollection.doc(this.ticketID).delete();
  }

  setTicketID(id:string): void{
    this.ticketID = id;
  }

}

