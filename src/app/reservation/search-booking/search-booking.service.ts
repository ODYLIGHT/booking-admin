import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { MomentService } from '../../services/moment.service';
import { PersonalInformationState, BookingState } from '../../store/types';
import { TeacherStore, SearchBookingStore } from './search-booking.store';

@Injectable()
export class SearchBookingService extends MomentService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetTeacherUrl = 'api/reservation/get-teacher';
    readonly apiSearchBookingUrl = 'api/reservation/search-booking/searching';
    readonly apiCancelBookingUrl = 'api/reservation/search-booking/cancel';

    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private teacherStore: TeacherStore,
        private bookingStore: SearchBookingStore
    ) { super() }

    public initGetTeacherApi(): void {
        this.http.get<PersonalInformationState[]>(this.apiGetTeacherUrl, { headers: this.headers })
            .subscribe(res => this.teacherStore.changeState(res));
    }

    private convertDateForStr(date: Date): string {
        return this._convertFormat(date, 'YYYY-MM-DD');
    }

    public searchBookingApi(params): void {
        let queryStr = '';
        for (const key in params) {
            if (params.hasOwnProperty(key) && !!params[key]) {
                const elem = (params[key] instanceof Date) ? this.convertDateForStr(params[key]) : params[key];
                queryStr += !!!queryStr ? `${key}=${elem}` : `&${key}=${elem}`;
            }
        }
        const searchParams = new HttpParams({ fromString: queryStr });
        // express側でデータ形成していますが、必要であればこちらで形成を行ってStoreを更新する
        this.http.get<BookingState[]>(this.apiSearchBookingUrl, { headers: this.headers, params: searchParams })
            .subscribe(res => this.bookingStore.changeState(res));
    }

    public cancelBookingApi(reservationId: string): void {
        this.http.put(this.apiCancelBookingUrl, {reservationId}, { headers: this.headers })
            .subscribe(
                res => {
                    if (!!!environment.production) console.log(res);
                    this.snackBar.open('Successfully deleted', null, { duration: 2000 });
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
                    const currentState: BookingState[] = Object.values(this.bookingStore.getCurrent);
                    const newState = currentState.filter(item => item.reserved_id !== reservationId);
                    this.bookingStore.changeState(newState);
                }
            );
    }

    public get getTeachers$(): Observable<PersonalInformationState[]> { return this.teacherStore.data$.pipe(map(s => Object.values(s))) };
    public get getBookings$(): Observable<BookingState[]> { return this.bookingStore.data$.pipe(map(s => Object.values(s))) }

}
