import { Injectable } from '@angular/core';
// import { moment } from 'moment-timezone';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class MomentService {
    private WeekStartAsUTC: moment.Moment = moment.utc().startOf('week'); // UTC時間における今週の最初の日付（日曜）
    private WeekEndAsUTC: moment.Moment = moment.utc().endOf('week'); // UTC時間における今週の最後の日付（土曜）
    private daysArray: moment.Moment[];
    private timesArray: string[]; // ['00:00', '00:30', ...]
    private timeZone: string;

    constructor() {
        // console.log(moment.tz.names())
        // console.log(moment.utc().utcOffset('+10:00'));
    }

    public init(timeZoneName: string) {
        this.timeZone = timeZoneName;
        this.daysArray = this.getOneWeekUTCDates(timeZoneName);
        this.timesArray = this.getTimeTableElements;
    }

    private getOneWeekUTCDates(timeZoneName: string) {
        const daysArray = [];
        let startDay = moment.tz(new Date(), timeZoneName).startOf('week');
        const lastDay = moment.tz(new Date(), timeZoneName).endOf('week');
        while (startDay <= lastDay) {
            daysArray.push(startDay.utc().toDate());
            startDay = startDay.clone().add(1, 'd');
        }
        return daysArray;
    }

    private get getTimeTableElements() {
        const timesAry = []; // ['00:00', '00:30', ...]
        for (
            const target = this.WeekStartAsUTC.clone();
            target.isBefore(this.WeekStartAsUTC.clone().add(1, 'd'));
            target.add(30, 'minutes')
        ) {
            timesAry.push(target.format('HH:mm'));
        }
        // console.log(timesAry);
        return timesAry;
    }

    public get getDays() { return this.daysArray }

    public get getTimeTables() { return this.timesArray }

    public get getTimeZone() { return `${this.timeZone} ${moment.tz(this.timeZone).format('Z')}` }

    public convertedDate(date: Date, time: string) {
        const ms = (() => {
            const _t = time.split(':');
            return (parseInt(_t[0], 10) * 60 * 60 * 1000) + (parseInt(_t[1], 10) * 60 * 1000);
        })();
        // console.log(moment(date).utc().add(ms, 'ms').format());
        return moment(date).utc().add(ms, 'ms').toISOString();
    }

}
