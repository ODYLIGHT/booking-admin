import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CreditState } from '../../store/types';
import { CreditInformationStore } from './credit-information.store';

@Injectable()
export class CreditInformationService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetCreditsUrl = 'api/student-information/get-credits';

    constructor(
        private http: HttpClient,
        private store: CreditInformationStore
    ) { }

    public getCreditsApi(id: number) {
        const params = new HttpParams().set('id', `${id}`);
        this.http.get<CreditState[]>(this.apiGetCreditsUrl, { headers: this.headers, params })
            .subscribe(res => this.store.changeState(res));
    }

    public get getCredits$(): Observable<CreditState[]> { return this.store.data$.pipe(map(s => Object.values(s))) }

}
