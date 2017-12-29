import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SearchCustomerStore } from './search-customer.store';
import { SearcherCustomerState } from '../../../store/types';

@Injectable()
export class SearchCustomerService {
    readonly apiGetUrl = 'api/reservation/register-of-booking/search-customer';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: SearchCustomerStore
    ) { }

    public getCustomer(id: number) {
        this.http.get(`${this.apiGetUrl}/${id}`, this.options)
            .map(s => s.json() as SearcherCustomerState)
            .subscribe(res => this.store.changeState(res));
    }

    public get getName$(): Observable<string> { return this.store.data$.map(s => s._name) }

}
