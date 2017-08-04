import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { TeacherScheduleStore } from './teacher-schedule.store';
import { ScheduleState } from '../../store/types';

@Injectable()
export class TeacherScheduleService {
    readonly apiInitUrl = 'api/teacher-information/teacher-schedule';
    readonly apiPutUrl = 'api/teacher-information/teacher-schedule/update';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: TeacherScheduleStore
    ) { }

    public getInit(): void {
        this.http.get(this.apiInitUrl, this.options)
            .map(s => s.json())
            .subscribe(res => this.store.changeState(res));
    }

    public get getItems$(): Observable<ScheduleState[]> { return this.store.data$.map(s => Object.values(s)) }

    public putSchedule(schedules: ScheduleState[]): void {
        this.http.put(this.apiPutUrl, schedules, this.options)
            .map(s => s.json())
            // .subscribe(res => this.store.changeState(res));
            .subscribe(res => console.log(res));
    }

}
