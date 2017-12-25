import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TeacherFormsStore } from './teacher-forms.store';
import { TeacherState } from '../../../store/types';
import { MomentService } from '../../../services/moment.service';

@Injectable()
export class TeacherFormsService {
    readonly apiGetUrl = 'api/teacher-information/register-teachers/get';
    readonly apiPostUrl = 'api/teacher-information/register-teachers/post';
    readonly apiPutUrl = 'api/teacher-information/register-teachers/put';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private store: TeacherFormsStore,
        private moment: MomentService
    ) { }

    public get getItems$(): Observable<TeacherState> { return this.store.data$.pipe(map(s => s)) }

    public getInitWithId(id: number): void {
        this.http.get<TeacherState>(`${this.apiGetUrl}/${id}`, { headers: this.headers })
            .subscribe(res => this.store.changeState(res));
    }

    public get getTimeZones(): string[] { return this.moment.getTimeZones }

    // public insertTeacher(params: TeacherState): void {
    //     this.http.post(this.apiPostUrl, params, { headers: this.headers })
    //         .map(s => s.json())
    //         .subscribe(res => {
    //             console.info(`insert success`);
    //             console.log(res);
    //         });
    // }

    // public putTeacher(params: TeacherState): void {
    //     this.http.put(this.apiPutUrl, params, { headers: this.headers })
    //         .map(s => s.json())
    //         .subscribe(res => {
    //             console.info(`update success`);
    //             console.log(res);
    //         });
    // }

}
