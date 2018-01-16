import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { MomentService } from '../../services/moment.service';
import { PersonalInformationState } from '../../store/types';
import { TeacherStore, CheckScheduleState, CheckTeacherScheduleStore } from './check-teacher-schedule.store';

@Injectable()
export class CheckTeacherScheduleService extends MomentService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetTeacherUrl = 'api/reservation/get-teacher';
    readonly apiGetScheduleUrl = 'api/reservation/check-teacher-schedule/get';

    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private teacherStore: TeacherStore,
        private checkStore: CheckTeacherScheduleStore
    ) { super() }

    public initGetTeacherApi(): void {
        this.http.get<PersonalInformationState[]>(this.apiGetTeacherUrl, { headers: this.headers })
            .subscribe(res => this.teacherStore.changeState(res));
    }

    private convertDateForStr(date: Date): string {
        return this._convertFormat(date, 'YYYY-MM-DD');
    }

    public GetScheduleApi(_p): void {
        const dateStr = this.convertDateForStr(_p.date);
        const params = new HttpParams().set('id', _p.teacher.id).set('date', dateStr);
        this.http.get(this.apiGetScheduleUrl, { headers: this.headers, params })
            .subscribe(res => {
                const newState = {
                    teacher: _p.teacher,
                    dateAsUTC: dateStr,
                    schedules: res['schedules'],
                    reservations: res['reservations']
                };
                this.checkStore.changeState(newState);
            });
    }

    public get getTeachers$(): Observable<PersonalInformationState[]> { return this.teacherStore.data$.pipe(map(s => Object.values(s))) };
    public get getSchedules$(): Observable<CheckScheduleState> { return this.checkStore.data$ }

}
