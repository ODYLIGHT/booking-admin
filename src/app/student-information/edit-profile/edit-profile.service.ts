import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { CustomerState } from '../../store/types';

@Injectable()
export class EditProfileService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    readonly apiGetProfileUrl = 'api/student-information/get-profile';

    constructor(private http: HttpClient) { }

    public getProfileApi(id: number): Observable<CustomerState> {
        const params = new HttpParams().set('id', `${id}`);
        return this.http.get<CustomerState>(this.apiGetProfileUrl, { headers: this.headers, params });
    }

}
