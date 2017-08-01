import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { RegisterTeachersStore } from './register-teachers.store';
import { TeacherState } from '../../store/types';

@Injectable()
export class RegisterTeachersService {
    readonly apiInitUrl = 'api/teacher-information/register-teachers';
    readonly apiDeleteUrl = 'api/teacher-information/register-teachers/delete/';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: RegisterTeachersStore
    ) { }

    public getInit(): void {
        this.http.get(this.apiInitUrl, this.options)
            .map(s => s.json())
            .subscribe(res => this.store.changeState(res));
    }

    public get getItems$(): Observable<TeacherState[]> { return this.store.data$.map(s => Object.values(s)) }

    public deleteTeacher(id: number): void {
        this.http.delete(`${this.apiDeleteUrl}${id}`, this.options)
            .map(s => s.json())
            .subscribe(res => this.store.changeState(res));
    }

}
