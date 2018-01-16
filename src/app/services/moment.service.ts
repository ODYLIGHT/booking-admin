import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import 'moment-timezone';
import { Moment } from 'moment-timezone';

/**
 *
 *
 * このサービスは日付に関する操作だけを管理するものに変える
 * 必要なデータ形式は各コンポーネントサービス側で行う
 *
 *
 */

@Injectable()
export class MomentService {
    private _moment = moment;

    constructor() { }

    /**
     * 全てのタイムゾーンを返す
     */
    public get getTimeZones(): string[] { return this._moment.tz.names() }

    public timeIntervalFromTimeZone(timeZone: string): string { return `${timeZone} ${this._moment.tz(timeZone).format('Z')}` }

    protected getDayOfWeek(timeZone: string, date?: string): Date[] {
        const headerDates: Date[] = [];
        const d = (!!!date)
            ? this._moment().tz(timeZone).format('YYYY-MM-DD')
            : this._moment(date).format('YYYY-MM-DD');
        let startDate = this._moment.tz(d, timeZone);
        const endDate = startDate.clone().add(6, 'd');
        while (startDate <= endDate) {
            headerDates.push(startDate.toDate());
            startDate = startDate.clone().add(1, 'd');
        }
        return headerDates;
    }

    protected addWeek(currentDate: Date[], additionalAction: string): Date[] {
        switch (additionalAction) {
            case 'increment':
                return currentDate.map(d => this._moment(d).add(1, 'w').toDate());
            case 'decrement':
                return currentDate.map(d => this._moment(d).subtract(1, 'w').toDate());
            default:
                return currentDate;
        }
    }

    protected _getLeftColumns(): string[] {
        const leftColumns: string[] = [];
        for (
            const startDate = this._moment(this._moment().format('YYYY-MM-DD'));
            startDate.isBefore(this._moment(this._moment().format('YYYY-MM-DD')).add(1, 'd'));
            startDate.add(30, 'minutes')
        ) {
            leftColumns.push(startDate.format('HH:mm'));
        }
        return leftColumns;
    }

    protected _convertFormat(date: Date, format: string): string {
        this._moment.locale('en');
        return this._moment(date).format(format);
    }

    /**
     * `date`をUTC時間に変更したうえで`time`のミリ秒を加算した時間文字列を返す
     * @param date ローカル時間
     * @param time '00:00'や'00:30'
     */
    public convertDate(date: Date, time: string): string {
        const ms = (() => {
            const _t = time.split(':');
            return (parseInt(_t[0], 10) * 60 * 60 * 1000) + (parseInt(_t[1], 10) * 60 * 1000);
        })();
        return this._moment(date).utc().add(ms, 'ms').format();
    }
}
