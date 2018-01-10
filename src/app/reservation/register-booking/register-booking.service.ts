import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { ReservationState } from '../../store/types';
import {
    SearchCustomerState,
    TeacherForOptionState, TeacherStore,
    OperationsState, OperationsStore,
    BookingStore, BookingState, initBookingState
} from './register-booking.store';

@Injectable()
export class RegisterBookingService {
    readonly apiGetTeacherUrl = 'api/reservation/register-of-booking/get-teacher';
    readonly apiSearchBookingUrl = 'api/reservation/register-of-booking/search-booking';
    // readonly apiSearchCustomerUrl = 'api/reservation/register-of-booking/search-customer';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private teacherStore: TeacherStore,
        private operationStore: OperationsStore,
        private bookingStore: BookingStore
    ) { }

    public getTeacherApi(): void {
        this.http.get<TeacherForOptionState[]>(this.apiGetTeacherUrl, { headers: this.headers }).pipe(
            map(s => Object.values(s) as TeacherForOptionState[])
        ).subscribe(res => this.teacherStore.changeState(res));
    }

    public searchCustomerApi(_params): void {
        const params = {
            customerId: _params.customer.id,
            teacherId: _params.teacher.id
        };
        this.http.get(this.apiSearchBookingUrl, { headers: this.headers, params })
            .subscribe(
                res => {
                    if (!!!res) return window.alert('No target customer...');
                    const newCustomerState = Object.assign({}, res['customer']);
                    const newTeacherState = _params['teacher'];
                    // OperationStoreの更新
                    this.operationStore.changeState({ customer: newCustomerState, teacher: newTeacherState });
                    // BookingStoreの更新
                    const allReservations: ReservationState[] = res['reservations'];
                    const current = [];
                    const canNotReserve = [];
                    allReservations.forEach(obj => {
                        obj.customer_id === params.customerId ? current.push(obj.reserved_date) : canNotReserve.push(obj.reserved_date);
                    });
                    this.saveBookingState({
                        customerId: newCustomerState.id,
                        teacherId: newTeacherState.id,
                        reservations: {
                            insert: [],
                            current,
                            delete: []
                        },
                        canNotReserve
                    });
                },
                (err: HttpErrorResponse) => {
                    const errorMessage =
                        'There was a problem on the server side.\n'
                        + 'Please give the administrator the following message / code.\n'
                        + `[message]: ${err.statusText}\n`
                        + `[code]: ${err.status}\n`
                        ;
                    window.alert(errorMessage);
                }
            );
    }

    public saveBookingState(newState: any): void {
        const currentBooking = { ...this.bookingStore.getCurrent };
        const updateState: BookingState = Object.assign({}, currentBooking, newState);
        this.bookingStore.changeState(updateState);
    }

    public get getTeachers$(): Observable<TeacherForOptionState[]> { return this.teacherStore.data$.pipe(map(s => Object.values(s))) }
    public get getOperation$(): Observable<OperationsState> { return this.operationStore.data$ }
    public get getBooking$(): Observable<BookingState> { return this.bookingStore.data$ }

}
