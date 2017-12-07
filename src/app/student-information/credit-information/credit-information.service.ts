import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CreditInformationService {
    private getCreditUrl = 'api/student-information/credit/get';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor( private http: Http ) { }

    public getCreditApi(params: { [key: string]: string }): void {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('id', params.id);
        this.options.params = urlSearchParams;
        this.http.get(this.getCreditUrl, this.options)
            .map(s => s.json())
            .subscribe(state => console.log(state));
    }

}
