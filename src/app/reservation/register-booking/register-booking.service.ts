import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { ReservationState, PersonalInformationState } from '../../store/types';
import {
    TeacherStore,
    OperationsState, OperationsStore, initOperation,
    BookingStore, BookingState
} from './register-booking.store';

@Injectable()
export class RegisterBookingService {
    readonly apiGetTeacherUrl = 'api/reservation/get-teacher';
    readonly apiSearchBookingUrl = 'api/reservation/register-of-booking/search-booking';
    readonly apiPutUrl = 'api/reservation/register-of-booking/update';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private teacherStore: TeacherStore,
        private operationStore: OperationsStore,
        private bookingStore: BookingStore,
        private snackBar: MatSnackBar
    ) { }

    public getTeacherApi(): void {
        this.http.get<PersonalInformationState[]>(this.apiGetTeacherUrl, { headers: this.headers }).pipe(
            map(s => Object.values(s) as PersonalInformationState[])
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
                    if (!!!res) {
                        const resetOperations = {
                            customer: Object.assign({}, initOperation.customer, { id: _params.customer.id }),
                            teacher: _params.teacher
                        }
                        this.operationStore.changeState(resetOperations);
                        this.bookingStore.changeState(undefined);
                        return window.alert('No target customer...');
                    }
                    const newCustomerState = Object.assign({}, res['customer']);
                    const newTeacherState = _params['teacher'];
                    // OperationStoreの更新
                    this.operationStore.changeState({ customer: newCustomerState, teacher: newTeacherState });
                    // BookingStoreの更新
                    const allReservations: ReservationState[] = res['reservations'];
                    const current = [];
                    const canNotReserve = res['schedules'];
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

    public updateApi(): void {
        const currentBookingState = { ...this.bookingStore.getCurrent };
        const params = {
            customerId: currentBookingState.customerId,
            teacherId: currentBookingState.teacherId,
            insert: currentBookingState.reservations.insert,
            delete: currentBookingState.reservations.delete
        };
        if (!!!params.insert.length && !!!params.delete.length) return window.alert('nothing to change.');
        this.http.put(this.apiPutUrl, params, { headers: this.headers })
            .subscribe(
                res => {
                    if (!!!environment.production) console.log(res);
                    this.snackBar.open('Successfully updated.', null, { duration: 2000 });
                },
                (err: HttpErrorResponse) => {
                    const errorMessage =
                        'There was a problem on the server side.\n'
                        + 'Please give the administrator the following message / code.\n'
                        + `[message]: ${err.statusText}\n`
                        + `[code]: ${err.status}\n`
                        ;
                    window.alert(errorMessage);
                },
                () => {
                    const current = currentBookingState.reservations.current.filter(time => !!!params.delete.includes(time));
                    current.push(...currentBookingState.reservations.insert);
                    const newReservationsState = { current, insert: [], delete: [] };
                    const newBookingState = Object.assign({}, currentBookingState, { reservations: newReservationsState });
                    this.bookingStore.changeState(newBookingState);
                }
            );
    }

    public saveBookingState(newState: any): void {
        const currentBooking = { ...this.bookingStore.getCurrent };
        const updateState: BookingState = Object.assign({}, currentBooking, newState);
        this.bookingStore.changeState(updateState);
    }

    public updateState(arg: { targetColumn: string; action: string; value: string; }) {
        const currentBookingState: BookingState = { ...this.bookingStore.getCurrent };
        const updatedProparty: { [key: string]: string[] } = {};
        updatedProparty[arg.targetColumn] = arg.action === 'add'
            ? [...currentBookingState.reservations[arg.targetColumn], arg.value]
            : [...currentBookingState.reservations[arg.targetColumn]].filter(str => str !== arg.value);
        const newReservations = Object.assign({}, currentBookingState.reservations, updatedProparty);
        const updateBookingState = Object.assign({}, currentBookingState, {reservations: newReservations});
        this.bookingStore.changeState(updateBookingState);
    }

    public get getTeachers$(): Observable<PersonalInformationState[]> { return this.teacherStore.data$.pipe(map(s => Object.values(s))) }
    public get getOperation$(): Observable<OperationsState> { return this.operationStore.data$ }
    public get getBooking$(): Observable<BookingState> { return this.bookingStore.data$ }

}
