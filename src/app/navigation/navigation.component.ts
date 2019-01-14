import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ArgumentOutOfRangeError } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private ticketDetail: TicketDetailComponent;
  private _mobileQueryListener: () => void;
  id: string;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private route: ActivatedRoute) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  

  addTicket(): void {
    this.router.navigateByUrl('/customers');
  }


}
