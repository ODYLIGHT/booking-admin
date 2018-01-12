import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PersonalInformationState } from '../../store/types';

import { SearchBookingService } from './search-booking.service';
import { TeacherStore } from './search-booking.store';

@Component({
    selector: 'app-search-booking',
    templateUrl: './search-booking.component.html',
    styleUrls: ['./search-booking.component.scss'],
    providers: [SearchBookingService, TeacherStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBookingComponent implements OnInit {

    constructor(private service: SearchBookingService) { }

    ngOnInit() { this.service.initGetTeacherApi() }

    public onSearch(params): void { this.service.searchBookingApi(params) }

    public get teachersAsObservable$(): Observable<PersonalInformationState[]> { return this.service.getTeachers$ }

}
