import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PersonalInformationState, BookingState } from '../../store/types';

import { SearchBookingService } from './search-booking.service';
import { TeacherStore, SearchBookingStore } from './search-booking.store';

@Component({
    selector: 'app-search-booking',
    templateUrl: './search-booking.component.html',
    styleUrls: ['./search-booking.component.scss'],
    providers: [SearchBookingService, TeacherStore, SearchBookingStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBookingComponent implements OnInit {

    constructor(private service: SearchBookingService) { }

    ngOnInit() { this.service.initGetTeacherApi() }

    public onSearch(params): void { this.service.searchBookingApi(params) }

    public get teachersAsObservable$(): Observable<PersonalInformationState[]> { return this.service.getTeachers$ }
    public get bookingAsObservable$(): Observable<BookingState[]> { return this.service.getBookings$ }

}
