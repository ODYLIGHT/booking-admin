import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Moment } from 'moment-timezone';

import { MomentService } from '../../../services/moment.service';
import {
    TeacherScheduleStore, OptionItemsState,
} from '../teacher-schedule.store';

@Injectable()
export class ScheduleTableService extends MomentService {

    constructor(
        private http: HttpClient,
        private store: TeacherScheduleStore
    ) { super() }

    public convertFormat(date: Date, format: string): string {
        return this._convertFormat(date, format);
    }

}
