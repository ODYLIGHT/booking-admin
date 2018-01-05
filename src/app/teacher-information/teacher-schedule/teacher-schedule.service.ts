import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import {
    OperationsStore, OptionItemsState,
    TeacherScheduleStore, initScheduleState
} from './teacher-schedule.store';
import { ScheduleState, TeacherSchedulesState } from '../../store/types';

@Injectable()
export class TeacherScheduleService {
    readonly apiInitUrl = 'api/teacher-information/teacher-schedule/operations-init';
    readonly apiGetScheduleUrl = 'api/teacher-information/teacher-schedule/get-schedule';
    readonly apiPutUrl = 'api/teacher-information/teacher-schedule/update';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private operationsStore: OperationsStore,
        private scheduleStore: TeacherScheduleStore,
        private snackBar: MatSnackBar
    ) { }

    public initComponentItems(): void {
        this.http.get(this.apiInitUrl, { headers: this.headers }).pipe(
            map(s => Object.values(s) as OptionItemsState[])
        ).subscribe(res => this.operationsStore.changeState(res))
    }

    public getScheduleApi(paramsItem: OptionItemsState): void {
        const params = new HttpParams().set('id', `${paramsItem.id}`);
        this.http.get<Date[]>(this.apiGetScheduleUrl, { headers: this.headers, params: params }).subscribe(res => {
            const updateState = Object.assign({}, initScheduleState, { current: res });
            this.scheduleStore.changeState(updateState);
        })
    }

    public updateApi(id: number): void {
        const currentState: TeacherSchedulesState = { ...this.scheduleStore.getCurrent };
        const params = { id, insert: currentState.insert, delete: currentState.delete };
        if (!!!currentState.insert.length && !!!currentState.delete.length) return window.alert('nothing to change.');
        this.http.put(this.apiPutUrl, { headers: this.headers })
            .subscribe(
                res => {
                    if (!!!environment.production) console.log(res);
                    this.snackBar.open('Successfully updated.', null, { duration: 2000 });
                },
                (err: HttpErrorResponse) => {
                    const errorMessage =
                        'There was a problem on the server side.\n'
                        + 'Please give the administrator the following message / code.\n'
                        + `[message]: ${err.statusText}\n`
                        + `[code]: ${err.status}\n`
                        ;
                    window.alert(errorMessage);
                },
                () => {
                    // Updating Store State.
                    const current = currentState.current.filter(time => !!!currentState.delete.includes(time));
                    current.push(...currentState.insert);
                    const newState = { current, insert: [], delete: [] };
                    this.scheduleStore.changeState(newState);
                }
            );
    }

    public updateScheduleState(arg: { targetColumn: string; action: string; value: string; }) {
        const currentState: TeacherSchedulesState = { ...this.scheduleStore.getCurrent };
        const updatedProparty: { [key: string]: string[] } = {};
        updatedProparty[arg.targetColumn] = arg.action === 'add'
            ? [...currentState[arg.targetColumn], arg.value]
            : [...currentState[arg.targetColumn]].filter(str => str !== arg.value);
        const updateState = Object.assign({}, currentState, updatedProparty);
        this.scheduleStore.changeState(updateState);
    }

    public get getOperationsItems$(): Observable<OptionItemsState[]> { return this.operationsStore.data$.pipe(map(s => Object.values(s))) }

    public get getSchedules$(): Observable<TeacherSchedulesState> { return this.scheduleStore.data$ }

}
