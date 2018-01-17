import { Injectable } from '@angular/core';
import { MomentService } from '../../services/moment.service';

@Injectable()
export class InformationTableService extends MomentService {

    constructor() { super() }

    public getCountryItem(timeZone: string) {
        const formatedTzAry = this.formatedTimeZone(timeZone).split(':');
        const formatedTzStr = /00/.test(formatedTzAry[1]) ? formatedTzAry[0] : `${formatedTzAry[0]}.5`;
        return `UTC${formatedTzStr.replace(/^(\+|\-)0/, '$1')} ${timeZone}`;
    }

}
