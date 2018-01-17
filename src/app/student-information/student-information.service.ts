import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StudentInformationState } from '../store/types';
import { StudentInformationStore } from './student-information.store';

@Injectable()
export class StudentInformationService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetCustomerUrl = 'api/student-information/get';

    constructor(
        private http: HttpClient,
        private store: StudentInformationStore
    ) { }

    public getCustomerApi(formValue): void {
        // /**
        //  * 引数`formValue`オブジェクトを[key, value]の配列に変換(entries)しmap関数で各要素を'key=value'、または、undefinedにし、
        //  * filter関数で空要素を削除した後に&'で結合したクエリパラメータ文字列
        //  */
        // const params = Object.entries(formValue)
        //     .map((pair: string[]) => pair[1] ? `${pair[0]}=${pair[1]}` : undefined)
        //     .filter(Boolean)
        //     .join('&');
        // console.log(params);
        // const httpParams = new HttpParams({ fromString: params });

        /**
         * オブジェクトそのまま付与できたじゃん・・・
         */
        const params = {};
        for (const key in formValue) {
            if (formValue.hasOwnProperty(key) && !!formValue[key]) params[key] = formValue[key];
        };
        const httpParams = new HttpParams({ fromObject: params });
        this.http.get<StudentInformationState[]>(this.apiGetCustomerUrl, { headers: this.headers, params: httpParams })
            .subscribe(res => this.store.changeState(res));
    }

    public get getInformations$(): Observable<StudentInformationState[]> { return this.store.data$.pipe(map(s => Object.values(s))) }

}
