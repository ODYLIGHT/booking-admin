import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { SearchBookingStore } from './search-booking.store';
import { SearchBookingState } from '../../store/types';

@Injectable()
export class SearchBookingService {
    private apiSearchUrl = 'api/reservation/search-booking';
    private apiSendCancelUrl = 'api/reservation/search-booking/cancel';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: SearchBookingStore
    ) { }

    public getSearchBooking(obj: Object): void {
        let fullPath = (obj.hasOwnProperty('teacherName') && !!obj['teacherName'])
            ? `${this.apiSearchUrl}/teacher`
            : `${this.apiSearchUrl}/customer`;
        let queryParams = '';
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !!obj[key]) {
                queryParams += !!!queryParams ? `?${key}=${obj[key]}` : `&${key}=${obj[key]}`;
            }
        }
        fullPath += queryParams;

        this.http.get(fullPath, this.options)
            .map(s => s.json())
            .subscribe((res: SearchBookingState[]) => this.store.changeState(res));
    }

    public get bookings$(): Observable<SearchBookingState[]> { return this.store.data$.map(s => Object.values(s)) }

    public sendCancelBooking(obj): void {
        this.http.post(this.apiSendCancelUrl, obj, this.options)
            .map(s => s.json())
            .subscribe(res => console.log(res));
    }

}
