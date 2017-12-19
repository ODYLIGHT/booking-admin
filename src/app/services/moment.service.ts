import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import 'moment-timezone';

@Injectable()
export class MomentService {
    protected moment = moment;
    private WeekStartAsUTC: moment.Moment = this.moment.utc().startOf('week'); // UTC時間における今週の最初の日付（日曜）
    private WeekEndAsUTC: moment.Moment = this.moment.utc().endOf('week'); // UTC時間における今週の最後の日付（土曜）
    private oneWeekAsMoment: BehaviorSubject<moment.Moment[]> = new BehaviorSubject([]);
    private timeZone: BehaviorSubject<string> = new BehaviorSubject('');
    // private oneWeekAsMoment: moment.Moment[];
    // private timeZone: string;
    private leftLineValues: string[]; // ['00:00', '00:30', ...]

    constructor() { this.leftLineValues = this.setLeftLineValues() }

    /**
     * MomentService initialize method.
     * @param timeZoneName User's TimeZone name
     */
    public init(timeZoneName: string): void {
        this.timeZone.next(this.setTimeZone(timeZoneName));
        this.oneWeekAsMoment.next(this.oneWeekReflectedTimeZone(timeZoneName));
    }

    private setTimeZone(tz: string): string { return `${tz} ${this.moment.tz(tz).format('Z')}` }

    /**
     * テーブルヘッダー部分に表示したい一週間のmoment時間配列を返す
     * @param timeZoneName 選択した講師のタイムゾーン
     */
    private oneWeekReflectedTimeZone(timeZoneName: string): moment.Moment[] {
        const oneWeekAsMoment = [];
        let startDay = this.moment.tz(new Date(), timeZoneName).startOf('week');
        const lastDay = this.moment.tz(new Date(), timeZoneName).endOf('week');
        while (startDay <= lastDay) {
            oneWeekAsMoment.push(startDay.utc().toDate());
            startDay = startDay.clone().add(1, 'd');
        }
        return oneWeekAsMoment;
    }

    /**
     * テーブル１列目の時間タイトルに使う文字列配列を返す
     */
    private setLeftLineValues(): string[] {
        const timesAry = []; // ['00:00', '00:30', ...]
        for (
            const target = this.WeekStartAsUTC.clone();
            target.isBefore(this.WeekStartAsUTC.clone().add(1, 'd'));
            target.add(30, 'minutes')
        ) {
            timesAry.push(target.format('HH:mm'));
        }
        return timesAry;
    }

    /**
     * `date`をUTC時間に変更したうえで`time`のミリ秒を加算した時間文字列を返す
     * @param date ローカル時間
     * @param time '00:00'や'00:30'
     */
    public convertedDate(date: Date, time: string): string {
        const ms = (() => {
            const _t = time.split(':');
            return (parseInt(_t[0], 10) * 60 * 60 * 1000) + (parseInt(_t[1], 10) * 60 * 1000);
        })();
        return this.moment(date).utc().add(ms, 'ms').toISOString();
    }

    public setSchedules(date: string, schedules: string[]): string[] {
        if (schedules.length === 0 || schedules.findIndex(elm => this.moment(date).isSame(this.moment(elm).format())) < 0) {
            schedules.push(date);
        } else {
            schedules = schedules.filter(elm => !!!this.moment(date).isSame(this.moment(elm).format()));
        }
        return schedules;
    }

    public isIncluded(date: string, ary: string[]): boolean {
        const bool = ary.filter(v => this.moment(date).isSame(this.moment(v).format()));
        return !!bool.length ? true : false;
    }

    public deleteDateFromSelected(date: string, ary: string[]): string[] {
        return ary.filter(v => !!!this.moment(date).isSame(this.moment(v).format()));
    }

    //////////////////////////////////////////////////////// Getters ////////////////////////////////////////////////////////
    get _dayOfWeek() { return this.oneWeekAsMoment }
    get _leftLine() { return this.leftLineValues }
    get _timeZone() { return this.timeZone }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
