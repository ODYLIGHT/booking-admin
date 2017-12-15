import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { StudentInformationStore } from './student-information.store';
import { SearchedStudentInformationState } from '../../store/types';

@Injectable()
export class StudentInformationService {
    private apiSearchUrl = 'api/student-information/search';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(
        private http: Http,
        private store: StudentInformationStore
    ) { }

    public getSearchStudent(obj): void {
        this.http.post(this.apiSearchUrl, obj)
            .map(s => s.json())
            .subscribe((state: SearchedStudentInformationState[]) => this.store.changeState(state));
    }

    public get students$(): Observable<SearchedStudentInformationState[]> { return this.store.data$.map(s => Object.values(s)) }

}
