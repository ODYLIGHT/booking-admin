import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RegisterBookingService } from './register-booking.service';
import { SearchCustomerStore, SearchCustomerState } from './register-booking.store';

@Component({
    selector: 'app-register-booking',
    templateUrl: './register-booking.component.html',
    styleUrls: ['./register-booking.component.scss'],
    providers: [RegisterBookingService, SearchCustomerStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterBookingComponent implements OnInit {

    constructor(
        private service: RegisterBookingService,
        private scStore: SearchCustomerStore
    ) { }

    ngOnInit() {
    }

    public onSearch(customer: SearchCustomerState): void { this.service.searchCustomerApi(customer) }

    public get customerAsObservable$(): Observable<SearchCustomerState> { return this.service.getCustomer$ }
}
