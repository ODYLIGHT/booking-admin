import { Injectable } from '@angular/core';
import { MomentService } from '../../../services/moment.service';

@Injectable()
export class ScheduleTableService extends MomentService {

    constructor() { super() }

    public convertFormat(date: Date, format: string): string { return this._convertFormat(date, format) }

}
