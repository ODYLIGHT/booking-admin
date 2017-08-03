import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TeacherFormsStore } from './teacher-forms.store';
import { TeacherState } from '../../../store/types';

@Injectable()
export class TeacherFormsService {
    readonly apiGetUrl = 'api/teacher-information/register-teachers/get';
    readonly apiPostUrl = 'api/teacher-information/register-teachers/post';
    readonly apiPutUrl = 'api/teacher-information/register-teachers/put';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: TeacherFormsStore
    ) { }

    public getInitWithId(id: number): void {
        this.http.get(`${this.apiGetUrl}/${id}`, this.options)
            .map(s => s.json())
            .subscribe(res => this.store.changeState(res));
    }

    public get getItems$(): Observable<TeacherState> { return this.store.data$.map(s => s) }

    public insertTeacher(params: TeacherState): void {
        this.http.post(this.apiPostUrl, params, this.options)
            .map(s => s.json())
            .subscribe(res => {
                console.info(`insert success`);
                console.log(res);
            });
    }

    public putTeacher(params: TeacherState): void {
        this.http.put(this.apiPutUrl, params, this.options)
            .map(s => s.json())
            .subscribe(res => {
                console.info(`update success`);
                console.log(res);
            });
    }

}
