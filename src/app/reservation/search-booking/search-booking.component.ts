import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SearchBookingService } from './search-booking.service';
import { SearchBookingStore } from './search-booking.store';
import { SearchBookingState } from '../../store/types';

@Component({
    selector: 'app-search-booking',
    templateUrl: './search-booking.component.html',
    styleUrls: ['./search-booking.component.scss'],
    providers: [SearchBookingService, SearchBookingStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBookingComponent implements OnInit {

    constructor(
        private service: SearchBookingService
    ) { }

    ngOnInit() {
    }

    public search(event): void { this.service.getSearchBooking(event) }

    public get bookingAsObservable$(): Observable<SearchBookingState[]> { return this.service.bookings$.map(s => s) }

    public onCanceller(obj) {
        this.service.sendCancelBooking(obj);
    }

}
