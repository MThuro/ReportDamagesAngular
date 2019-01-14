import { map } from 'rxjs/operators';
import { ticket } from './ticket';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketCollection: AngularFirestoreCollection<ticket>;
  private ticketDocument: AngularFirestoreDocument<ticket>;
  tickets: Observable<ticket[]>;
  ticketsNew: Observable<ticket[]>;
  ticketsProgress: Observable<ticket[]>;
  ticketsFixed: Observable<ticket[]>;
  ticketID: string;
  constructor(private afs: AngularFirestore) {
    this.ticketCollection = afs.collection<ticket>('tickets');
   }

  getNewTickets(): Observable<ticket[]>{
    let ticketsNewRef = this.afs.collection<ticket>('tickets', ref => ref.where('ticketStatus', '==', "New"));
    this.ticketsNew = ticketsNewRef.snapshotChanges().pipe(map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as ticket;
        const id = a.payload.doc.id;
        return {id, ...data};
         });
        }));
    return this.ticketsNew;
  }
  getTicketsInProgress(): Observable<ticket[]>{
    let ticketsProgressRef = this.afs.collection<ticket>('tickets', ref => ref.where('ticketStatus', '==', "In Progress"));
    this.ticketsProgress = ticketsProgressRef.snapshotChanges().pipe(map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as ticket;
        const id = a.payload.doc.id;
        return {id, ...data};
         });
        }));
    return this.ticketsProgress;
  }

  getTicketsFixed(): Observable<ticket[]>{
    let ticketsFixedRef = this.afs.collection<ticket>('tickets', ref => ref.where('ticketStatus', '==', "Fixed"));
    this.ticketsFixed = ticketsFixedRef.snapshotChanges().pipe(map(actions=> {
      return actions.map(a => {
        const data = a.payload.doc.data() as ticket;
        const id = a.payload.doc.id;
        return {id, ...data};
         });
        }));
    return this.ticketsFixed; 
  }
  
  addTicket(ticket: ticket){
    let id = JSON.parse(localStorage.getItem("id"));
    id = id + 1;
    localStorage.setItem("id", id);
    ticket.id = JSON.stringify(id);
    this.ticketCollection.doc(ticket.id).set(ticket);
  }

  getTicket(id: string): Observable<ticket>{
    this.setTicketID(id);
    this.ticketDocument = this.ticketCollection.doc(id);
    return this.ticketDocument.valueChanges();
  }

  updateTicket(id: string, ticket: ticket): void{
    this.ticketCollection.doc(id).update(ticket);
  }

  deleteTicket(): void{
    this.ticketCollection.doc(this.ticketID).delete();
  }

  setTicketID(id:string): void{
    this.ticketID = id;
  }

}

