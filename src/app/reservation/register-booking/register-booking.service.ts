import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment';
import 'moment/locale/ja';

import { RegisterBookingStore } from './register-booking.store';
import { RegisterBookingTeachersState, ScheduleState } from '../../store/types';

@Injectable()
export class RegisterBookingService {
    readonly apiInitUrl = 'api/reservation/register-of-booking/init';
    readonly apiGetScheduleUrl = 'api/reservation/register-of-booking/schedule';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private allSchedule: ScheduleState[];
    private moment: moment.Moment = moment();
    public showsWeeks: Date[];
    public rows = [];
    public mainSchedule: { title: string; value: ScheduleState[] }[] = []; // convert schedules.
    public lengthOfOneDay = 48; // スケジュール1日のデータ数

    constructor(
        private http: Http,
        private store: RegisterBookingStore
    ) {
        this.setTheadTitles();
        this.moment.locale('ja');
        this.setRows();
    }

    public getInit(): void {
        this.http.get(this.apiInitUrl, this.options)
            .map(s => s.json())
            .subscribe(res => this.store.changeState(res));
    }

    public get getItems$(): Observable<RegisterBookingTeachersState[]> {
        return this.store.data$.map(s => Object.values(s));
    }

    public getSchedule(id: number): Observable<{ title: string; value: ScheduleState[] }[]> {
        return this.http.get(`${this.apiGetScheduleUrl}?id=${id}`, this.options)
            .map(s => s.json());
    }

    /**
     * 今日の日付の曜日整数（0~6）を取得
     * 日曜日を起点にする今日が含まれる一週間の配列を作成
     */
    private setTheadTitles(setDate?: Date): void {
        const today: Date = setDate ? setDate : this.moment.toDate();
        const weekNumberOfToday: number = this.moment.day();
        this.showsWeeks = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(this.moment.year(), this.moment.month(), this.moment.date() - (weekNumberOfToday - i));
            this.showsWeeks.push(d);
        }
    }

    private setRows(): void {
        for (let i = 0; i < 24; i++) {
            this.rows.push(i < 10 ? `0${i}:00-0${i}:30` : `${i}:00-${i}:30`);
            this.rows.push(i < 10 ? i === 9 ? `0${i}:30-${i + 1}:00` : `0${i}:30-0${i + 1}:00` : `${i}:30-${i + 1}:00`);
        }
    }

    private filterFromWeek(timeStr: string, index: number, schedule: ScheduleState[]) {
        const needSchedule = schedule.filter((obj, i, a) => {
            if (
                i === index ||
                i === this.lengthOfOneDay + index ||
                i === 2 * this.lengthOfOneDay + index ||
                i === 3 * this.lengthOfOneDay + index ||
                i === 4 * this.lengthOfOneDay + index ||
                i === 5 * this.lengthOfOneDay + index ||
                i === 6 * this.lengthOfOneDay + index ||
                i === 7 * this.lengthOfOneDay + index
            ) return true;
        });
        return {
            title: timeStr,
            value: needSchedule
        };
    }

    public convertSchedule(scheduleArray: ScheduleState[]) {
        if (!!!scheduleArray) return [];
        this.allSchedule = scheduleArray || [];
        const thisYear = new Date().getFullYear();
        // その年の1月1日からの経過日数
        const numberOfDaysElapsed: number = moment(this.showsWeeks[0]).diff([thisYear, 0, 1], 'days');
        const startIndex = numberOfDaysElapsed * this.lengthOfOneDay;
        const endIndex = startIndex + (this.lengthOfOneDay * 7);
        const mainSchedule = this.allSchedule.slice(startIndex, endIndex);
        this.mainSchedule = [];
        this.rows.forEach((timeStr, idx, ary) => {
            this.mainSchedule.push(this.filterFromWeek(timeStr, idx, mainSchedule));
        });
        return this.mainSchedule;
    }

    public switchWeek(event): void {
        this.moment = this.moment.add(event, 'days');
        this.setTheadTitles(this.moment.toDate());
    }

    public post() {
        console.log(this.allSchedule);
    }

}
