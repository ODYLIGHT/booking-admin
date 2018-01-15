import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { PersonalInformationState } from '../../store/types';
import { TeacherStore } from './check-teacher-schedule.store';

@Injectable()
export class CheckTeacherScheduleService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetTeacherUrl = 'api/reservation/get-teacher';

    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private teacherStore: TeacherStore
    ) { }

    public initGetTeacherApi(): void {
        this.http.get<PersonalInformationState[]>(this.apiGetTeacherUrl, { headers: this.headers })
            .subscribe(res => this.teacherStore.changeState(res));
    }

    public get getTeachers$(): Observable<PersonalInformationState[]> { return this.teacherStore.data$.pipe(map(s => Object.values(s))) };

}
