import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { HeaderStore } from './header.store';
import { MenuState } from '../store/types';

@Injectable()
export class HeaderService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiInitUrl = 'api/config/menues';

    constructor(
        private http: HttpClient,
        private store: HeaderStore
    ) { }

    public getInit(): void {
        this.http.get<MenuState[]>(this.apiInitUrl, {headers: this.headers})
        .subscribe(res => this.store.initStore(res));
    }

    public get getItems$(): Observable<MenuState[]> { return this.store.data$.pipe(map(s => Object.values(s))) }

}
