import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import {
    OperationsStore, OptionItemsState,
    TeacherScheduleStore
} from './teacher-schedule.store';
import { ScheduleState, TeacherSchedulesState } from '../../store/types';

@Injectable()
export class TeacherScheduleService {
    readonly apiInitUrl = 'api/teacher-information/teacher-schedule/operations-init';
    readonly apiGetScheduleUrl = 'api/teacher-information/teacher-schedule/get-schedule';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // readonly apiPutUrl = 'api/teacher-information/teacher-schedule/update';

    constructor(
        private http: HttpClient,
        private operationsStore: OperationsStore,
        private scheduleStore: TeacherScheduleStore
    ) { }

    public initComponentItems(): void {
        this.http.get(this.apiInitUrl, { headers: this.headers }).pipe(
            map(s => Object.values(s) as OptionItemsState[])
        ).subscribe(res => this.operationsStore.changeState(res))
    }

    public getScheduleApi(paramsItem: OptionItemsState): void {
        const params = new HttpParams().set('id', `${paramsItem.id}`);
        this.http.get<Date[]>(this.apiGetScheduleUrl, { headers: this.headers, params: params }).subscribe(res => {
            const updateState = Object.assign({}, this.scheduleStore.getCurrent, { currentSchedules: res });
            this.scheduleStore.changeState(updateState);
        })
    }

    public get getOperationsItems$(): Observable<OptionItemsState[]> { return this.operationsStore.data$.pipe(map(s => Object.values(s))) }

    public get getSchedules$(): Observable<TeacherSchedulesState> { return this.scheduleStore.data$ }

    // public getInit(): void {
    //     this.http.get(this.apiInitUrl, this.options)
    //         .map(s => s.json())
    //         .subscribe(res => this.store.changeState(res));
    // }

    // public get getItems$(): Observable<ScheduleState[]> { return this.store.data$.map(s => Object.values(s)) }

    // public putSchedule(schedules: ScheduleState[]): void {
    //     this.http.put(this.apiPutUrl, schedules, this.options)
    //         .map(s => s.json())
    //         // .subscribe(res => this.store.changeState(res));
    //         .subscribe(res => console.log(res));
    // }

}
