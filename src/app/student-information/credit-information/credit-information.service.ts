import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';

import { environment } from '../../../environments/environment';
import { CreditState } from '../../store/types';
import { CreditInformationStore } from './credit-information.store';

@Injectable()
export class CreditInformationService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetCreditsUrl = 'api/student-information/get-credits';
    readonly apiInsertCreditUrl = 'api/student-information/insert-credit';

    constructor(
        private http: HttpClient,
        private store: CreditInformationStore,
        private snackBar: MatSnackBar
    ) { }

    public getCreditsApi(id: number) {
        const params = new HttpParams().set('id', `${id}`);
        this.http.get<CreditState[]>(this.apiGetCreditsUrl, { headers: this.headers, params })
            .subscribe(res => this.store.changeState(res));
    }

    public insertCreditApi(_params) {
        // const { customer_id, credit_count, date = moment(_params.date).format('YYYY-MM-DD'), remarks } = _params;
        const params = Object.assign({}, _params, { date: moment(_params.date).utc().format('YYYY-MM-DD') });
        this.http.post(this.apiInsertCreditUrl, params, { headers: this.headers }).subscribe(
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
                const current: CreditState[] = Object.values(this.store.getCurrent);
                const newCredits: CreditState[] = [];
                for (let i = 0; i < params.credit_count; i++) {
                    const { customer_id, date, adjustment = 0, remarks } = params;
                    newCredits.push({ customer_id, date, adjustment, remarks });
                };
                const newState = [...current, ...newCredits];
                this.store.changeState(newState);
            }
        )
    }

    public get getCredits$(): Observable<CreditState[]> { return this.store.data$.pipe(map(s => Object.values(s))) }

}
