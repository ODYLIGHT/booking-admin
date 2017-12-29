import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
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
        private router: Router,
        private store: TeacherFormsStore,
        private moment: MomentService,
        private snackBar: MatSnackBar
    ) { }

    public get getItems$(): Observable<TeacherState> { return this.store.data$.pipe(map(s => s)) }

    public getInitWithId(id: number): void {
        this.http.get<TeacherState>(`${this.apiGetUrl}/${id}`, { headers: this.headers })
            .subscribe(res => this.store.changeState(res));
    }

    public get getTimeZones(): string[] { return this.moment.getTimeZones }

    public add(params: TeacherState): void {
        this.http.post(this.apiPostUrl, params, { headers: this.headers })
            .subscribe(res => {
                this.snackBar.open('Successfully Interted', null, { duration: 1000 }).afterDismissed().subscribe(() => {
                    this.router.navigate(['/administrator/register-teachers']);
                });
            });
    }

    public put(params: TeacherState): void {
        this.http.put(this.apiPutUrl, params, { headers: this.headers })
            .subscribe(res => {
                this.snackBar.open('Successfully Updated', null, { duration: 1000 }).afterDismissed().subscribe(() => {
                    this.router.navigate(['/administrator/register-teachers']);
                });
            });
    }

}
