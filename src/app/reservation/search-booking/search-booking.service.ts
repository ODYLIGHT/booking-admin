import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { MomentService } from '../../services/moment.service';
import { PersonalInformationState } from '../../store/types';
import { TeacherStore } from './search-booking.store';

@Injectable()
export class SearchBookingService extends MomentService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetTeacherUrl = 'api/reservation/get-teacher';
    readonly apiSearchBookingUrl = 'api/reservation/search-booking/searching';

    constructor(
        private snackBar: MatSnackBar,
        private http: HttpClient,
        private teacherStore: TeacherStore
    ) { super() }

    public initGetTeacherApi(): void {
        this.http.get<PersonalInformationState[]>(this.apiGetTeacherUrl, { headers: this.headers })
            .subscribe(res => this.teacherStore.changeState(res));
    }

    private convertDateForStr(date: Date): string {
        return this._convertFormat(date, 'YYYY-MM-DD');
    }

    public searchBookingApi(params): void {
        let queryStr = '';
        for (const key in params) {
            if (params.hasOwnProperty(key) && !!params[key]) {
                const elem = (params[key] instanceof Date) ? this.convertDateForStr(params[key]) : params[key];
                queryStr += !!!queryStr ? `${key}=${elem}` : `&${key}=${elem}`;
            }
        }
        const searchParams = new HttpParams({ fromString: queryStr });
        this.http.get(this.apiSearchBookingUrl, { headers: this.headers, params: searchParams })
            .subscribe(res => {
                console.log(res);
            });
    }

    public get getTeachers$(): Observable<PersonalInformationState[]> { return this.teacherStore.data$.pipe(map(s => Object.values(s))) };

}
