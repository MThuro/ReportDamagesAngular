import { ticket } from './ticket';
import { Injectable } from '@angular/core';
import { Observable, of , combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot, AngularFirestoreDocument } from '@angular/fire/firestore';
import { concat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketCollection: AngularFirestoreCollection<ticket>;
  private ticketDocument: AngularFirestoreDocument<ticket>;
  tickets: Observable<ticket[]>;
  ticketsNew: Observable<ticket[]>;
  ticketsProgress: Observable<ticket[]>;
  constructor(private afs: AngularFirestore) {
    this.ticketCollection = afs.collection<ticket>('tickets');
   }

  getNewTickets(): Observable<ticket[]>{
    let ticketsNewRef = this.afs.collection<ticket>('tickets', ref => ref.where('ticketStatus', '==', "New"));
    this.ticketsNew = ticketsNewRef.valueChanges();
    return this.ticketsNew;
  }
  getTicketsInProgress(): Observable<ticket[]>{
    this.ticketCollection = this.afs.collection<ticket>('tickets', ref => ref.where('ticketStatus', '==', "In Progress"));
    this.ticketsProgress = this.ticketCollection.valueChanges();
    return this.ticketsProgress;
  }
  
  addTicket(ticket: ticket){
    const id = this.afs.createId();
    ticket.id = id;
    this.ticketCollection.add(ticket);
  }

  getTicket(id: string): Observable<ticket>{
    this.ticketDocument = this.ticketCollection.doc(id);
    return this.ticketDocument.valueChanges();
  }

}

