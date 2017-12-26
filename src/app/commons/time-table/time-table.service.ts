import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Moment } from 'moment-timezone';
import { MomentService } from '../../services/moment.service';

@Injectable()
export class TimeTableService extends MomentService {

    constructor() { super() }

    public getHeaderDates(tz: string): Date[] { return this.getDayOfWeek(tz) }

    public get getLeftColumns(): string[] { return this._getLeftColumns() }

}
