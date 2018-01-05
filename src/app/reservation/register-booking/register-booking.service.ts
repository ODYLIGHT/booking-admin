import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
    SearchCustomerState, SearchCustomerStore
} from './register-booking.store';

@Injectable()
export class RegisterBookingService {
    readonly apiSearchCustomerUrl = 'api/reservation/register-of-booking/search-customer';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private scStore: SearchCustomerStore
    ) { }

    public searchCustomerApi(customer: SearchCustomerState): void {
        const params = new HttpParams().set('id', `${customer.id}`);
        this.http.get<SearchCustomerState>(this.apiSearchCustomerUrl, { headers: this.headers, params: params })
            .subscribe(
            res => {
                if (!!!res) window.alert('No target data...');
                const updateState = Object.assign({}, customer, { name: res });
                console.log(updateState);
                this.scStore.changeState(updateState);
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

    public get getCustomer$(): Observable<SearchCustomerState> { return this.scStore.data$ }

}
