import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PullDownMenusState, OverviewStore, CustomerState } from './overview.store';
// import { CustomerState } from '../../store/types';

@Injectable()
export class OverviewService {
    private apiPullDownMenusGetUrl = 'api/student-information/get/pull-down-menus';
    private apiCustomerGetUrl = 'api/student-information/get/customer';
    private apiInsertCustomerUrl = 'api/student-information/insert';
    private apiUpdateCustomerUrl = 'api/student-information/update';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: OverviewStore
    ) { }

    public get getPullDownMenusApi(): Observable<PullDownMenusState> {
        return this.http.get(this.apiPullDownMenusGetUrl, this.options).map(s => s.json());
    }

    public getCustomer(id: number): void {
        this.http.post(this.apiCustomerGetUrl, {id}, this.options).map(s => s.json()).subscribe(state => this.store.changeState(state));
    }

    public insertCustomer(params: CustomerState): Observable<any> {
        return this.http.post(this.apiInsertCustomerUrl, params, this.options).map(s => s.json());
    }

    public updateCustomer(params: CustomerState): Observable<any> {
        return this.http.put(this.apiUpdateCustomerUrl, params, this.options).map(s => s.json());
    }

    public get customer$(): Observable<CustomerState[]> { return this.store.data$.map(s => Object.values(s)) }

}
