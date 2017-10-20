import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface TeachersNameState {
    id: number;
    name: string;
}

@Injectable()
export class CheckTeacherScheduleService {
    // search-formに送る教師名取得URL
    private apiGetTeachersUrl = 'api/reservation/check-teacher-schedule/init-teacher';
    private apiSearchScheduleUrl = 'api/reservation/check-teacher-schedule/search-schedule';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private　http: Http
    ) { }

    public getTeachers(): Observable<TeachersNameState[]> {
        return this.http.get(this.apiGetTeachersUrl, this.options).map(s => s.json());
    }

    public getSchedule(params): void {
        this.http.post(this.apiSearchScheduleUrl, params, this.options)
            .map(s => s.json())
            .subscribe(items => console.log(items));
    }

}
