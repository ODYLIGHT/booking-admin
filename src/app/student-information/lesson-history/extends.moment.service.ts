import { Injectable } from '@angular/core';

import { MomentService } from '../../services/moment.service';

@Injectable()
export class ExtendsMomentService extends MomentService {

    constructor() { super() }

    public get getUtc() { return this.utcDate.format() }

    public getFormatedTz(_tz: string) { return this.formatedTimeZone(_tz) }

    public addTime(date: Date) {
        return this.convertDate(date, '00:30');
    }

}
