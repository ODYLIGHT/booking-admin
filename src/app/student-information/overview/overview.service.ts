import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { PullDownMenusState } from './overview.store';

@Injectable()
export class OverviewService {
    private apiPullDownMenusGetUrl = 'api/student-information/get/pull-down-menus';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor( private http: Http ) { }

    public get getPullDownMenusApi(): Observable<PullDownMenusState> {
        return this.http.get(this.apiPullDownMenusGetUrl, this.options).map(s => s.json());
    }

}
