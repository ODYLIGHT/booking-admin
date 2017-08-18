import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RegisterBookingService } from './register-booking.service';
import { RegisterBookingStore } from './register-booking.store';
import { SearcherCustomerState, RegisterBookingTeachersState } from '../../store/types';

@Component({
    selector: 'app-register-booking',
    templateUrl: './register-booking.component.html',
    styleUrls: ['./register-booking.component.scss'],
    providers: [RegisterBookingService, RegisterBookingStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterBookingComponent implements OnInit {

    constructor(
        private service: RegisterBookingService
    ) { }

    ngOnInit() { this.service.getInit() }

    public get teachersAsObservable$(): Observable<RegisterBookingTeachersState[]> {
        return this.service.getItems$.map(s => s);
    }

    public search(event: Observable<SearcherCustomerState>): void {
        console.log(event);
    }

}
