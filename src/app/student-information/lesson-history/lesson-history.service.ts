import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { LessonHistoryStore, HistortyState } from './lesson-history.store';
import { LessonHistoryState } from '../../store/types';

@Injectable()
export class LessonHistoryService {
    readonly apiInitUrl = 'api/student-information/lesson-history/get-init';
    readonly apiUpdateLevelUrl = 'api/student-information/lesson-history/update-level';
    readonly apiUpdateHistoryUrl = 'api/student-information/lesson-history/update-history';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private snack: MatSnackBar,
        private store: LessonHistoryStore
    ) { }

    // 画面遷移時の顧客情報・予約情報・プルダウンメニューの取得API
    public initApi(id: number) {
        const params = new HttpParams().set('id', `${id}`);
        this.http.get<HistortyState>(this.apiInitUrl, { headers: this.headers, params }).subscribe(
            res => this.store.changeState(res)
        );
    }

    // customer-infoのフランス語レベル変更をDB登録するAPI
    public changeLevelApi(value: string) {
        const currentState = {...this.store.getCurrent};
        const params = { id: currentState.customer.id, french_level: value };
        this.http.put(this.apiUpdateLevelUrl, params, { headers: this.headers }).subscribe(
            res => this.snack.open('Successfully Updated', null, { duration: 1000 }),
            err => { console.log(err) },
            () => {
                const newCustomer = Object.assign({}, currentState.customer, { french_level: params.french_level });
                const newState = Object.assign({}, currentState, { customer: newCustomer });
                this.store.changeState(newState);
            }
        );
    }

    // history-tableのRegisterボタンクリックによる登録API
    public registerApi(value: LessonHistoryState) {
        const currentState = { ...this.store.getCurrent };
        this.http.put(this.apiUpdateHistoryUrl, value, { headers: this.headers }).subscribe(
            res => this.snack.open('Successfully Updated', null, { duration: 1000 }),
            err => console.log(err),
            () => {
                const newHistorys = currentState.historys.map(obj =>
                    obj.reserved_id === value.reserved_id ? Object.assign({}, obj, value) : obj
                );
                const newState = Object.assign({}, currentState, { historys: newHistorys });
                this.store.changeState(newState);
            }
        );
    }

    public get getHistoryItems$(): Observable<HistortyState> { return this.store.data$ }

}
