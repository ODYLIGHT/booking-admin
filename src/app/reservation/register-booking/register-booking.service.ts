import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { RegisterBookingStore } from './register-booking.store';
import { RegisterBookingTeachersState } from '../../store/types';

@Injectable()
export class RegisterBookingService {
    readonly apiInitUrl = 'api/reservation/register-of-booking/init';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: RegisterBookingStore
    ) { }

    public getInit(): void {
        this.http.get(this.apiInitUrl, this.options)
            .map(s => s.json())
            .subscribe(res => this.store.changeState(res));
    }

    public get getItems$(): Observable<RegisterBookingTeachersState[]> {
        return this.store.data$.map(s => Object.values(s));
    }

}
