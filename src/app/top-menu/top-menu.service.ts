import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TopMenuStore } from './top-menu.store';
import { MenuState } from '../store/types';

@Injectable()
export class TopMenuService {
    readonly apiInitUrl = 'api/top/init';

    constructor(
        private http: Http,
        private store: TopMenuStore
    ) { }

    public getInit(): void {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        this.http.get(this.apiInitUrl, options)
            .map(s => s.json())
            .subscribe(res => this.store.initStore(res));
    }

    public get getItems$(): Observable<MenuState[]> { return this.store.data$.map(s => Object.values(s)) }

}
