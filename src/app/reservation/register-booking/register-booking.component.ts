import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RegisterBookingService } from './register-booking.service';
import { PersonalInformationState } from '../../store/types';
import {
    TeacherStore,
    OperationsStore, OperationsState,
    BookingStore, BookingState
} from './register-booking.store';

@Component({
    selector: 'app-register-booking',
    templateUrl: './register-booking.component.html',
    styleUrls: ['./register-booking.component.scss'],
    providers: [RegisterBookingService, TeacherStore, OperationsStore, BookingStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterBookingComponent implements OnInit {

    constructor( private service: RegisterBookingService ) { }

    ngOnInit() { this.service.getTeacherApi() }

    public onSearch(params): void { this.service.searchCustomerApi(params) }

    public clickEventObserver(event: { targetColumn: string; action: string; value: string; }) { this.service.updateState(event) }

    public register(): void { this.service.updateApi() }

    public get teacherAsObservable$(): Observable<PersonalInformationState[]> { return this.service.getTeachers$ }
    public get operationsAsObservable$(): Observable<OperationsState> { return this.service.getOperation$ }
    public get bookingAsObservable$(): Observable<BookingState> { return this.service.getBooking$ }
}
