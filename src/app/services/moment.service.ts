import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment';
import 'moment-timezone';
import { Moment } from 'moment-timezone';

@Injectable()
export class MomentService {
    protected moment = moment;
    private oneWeekAsMoment: BehaviorSubject<Moment[]> = new BehaviorSubject([]);
    private timeZone: BehaviorSubject<string> = new BehaviorSubject('');
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

    public get getTimeZones(): string[] {
        return this.moment.tz.names();
    }

    public exchangeDateToMoment(date: Date | string | number, utc?: boolean, timeZome?: string): Moment {
        return utc
            ? timeZome ? this.moment(date).utc().tz(timeZome) : this.moment(date).utc()
            : timeZome ? this.moment(date).tz(timeZome) : this.moment(date);
    }

    /**
     * テーブルヘッダー部分に表示したい一週間のmoment時間配列を返す
     * @param timeZoneName 選択した講師のタイムゾーン
     */
    private oneWeekReflectedTimeZone(timeZoneName: string): Moment[] {
        const oneWeekAsMoment = [];
        //////////////////////// part1: start Sunday //////////////////////////
        // // `toDate()`をするとローカル時間固定になってしまう・・・
        // // ここのロジックは変更が必要になるかも
        // let startDay = this.moment.tz(new Date(), timeZoneName).startOf('week');
        // const lastDay = this.moment.tz(new Date(), timeZoneName).endOf('week');
        // while (startDay <= lastDay) {
        //     oneWeekAsMoment.push(startDay.utc().toDate());
        //     startDay = startDay.clone().add(1, 'd');
        // }
        ////////////////////////////////////////////////////////////////////////
        ////////////////////////// part2: start today //////////////////////////
        let startDay = this.moment.tz(this.moment().tz(timeZoneName).format('YYYY-MM-DD'), timeZoneName);
        const lastDay = startDay.clone().add(6, 'd');
        while (startDay <= lastDay) {
            oneWeekAsMoment.push(startDay);
            startDay = startDay.clone().add(1, 'd');
        }
        ////////////////////////////////////////////////////////////////////////
        return oneWeekAsMoment;
    }

    /**
     * テーブル１列目の時間タイトルに使う文字列配列を返す
     */
    private setLeftLineValues(): string[] {
        const timesAry = []; // ['00:00', '00:30', ...]
        for (
            const target = this.moment(this.moment().format('YYYY-MM-DD'));
            target.isBefore(this.moment(this.moment().format('YYYY-MM-DD')).add(1, 'd'));
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
        return this.moment(date).utc().add(ms, 'ms').format();
    }

    public isScheduleExists(utc: string, schedules: string[]): boolean {
        // 現在のスケジュールをループで選択されているかの判定をすると、ものすごいループ量になり
        // ビューに反映するのが遅くなる・・・
        // なので、スケジュール配列を文字列化し、正規表現で含まれているかどうかの判定はどうでしょうか？
        const regExp = new RegExp(`\\S?${this.moment(utc).utc().format()}\\S?`, 'i');
        return regExp.test(schedules.join(','));

        // ループバージョン
        // return schedules.findIndex(elm => this.moment(utc).isSame(this.moment(elm).format())) >= 0;
    }

    public getSelectWeekStr(week: Moment[]): string {
        return `${this.moment(week[0]).locale('en').format('DD,MMM,YYYY')} - ${this.moment(week[6]).locale('en').format('DD,MMM,YYYY')}`
    }

    /**
     * 現在のスケジュールにない場合は引数`date`を追加、既にある場合は削除した新たなスケジュール日付配列を返す
     * @param date 追加・削除したい日付文字列
     * @param schedules 現在選択中のスケジュール日付配列
     */
    public setSchedules(date: string, schedules: string[]): string[] {
        if (schedules.length === 0 || !!!this.isScheduleExists(date, schedules)) {
            schedules.push(date);
        } else {
            schedules = schedules.filter(elm => !!!this.moment(date).isSame(this.moment(elm).format()));
        }
        return schedules;
    }

    /**
     * テーブルヘッダーの日付をクリックした際、現在のスケジュール配列を操作する
     *
     * 日付の全時間帯が、スケジュール配列に含まれていた場合（`existsDates.length === 48`）
     *
     * スケジュールからその時間帯を削除
     *
     * そうでない場合は、追加する
     * @param date クリックされたテーブルヘッダーの日付
     * @param schedule 現在のスケジュール
     */
    public setOneDaySchedules(date: Moment, schedule: string[]): string[] {
        let additionDate = date.clone();
        const copySchedule = schedule.slice();
        const limitDate = date.clone().add(1, 'd');
        const dateStrsOfOneDay = [];
        while (additionDate < limitDate) {
            dateStrsOfOneDay.push(additionDate.format());
            additionDate = additionDate.clone().add(30, 'm');
        }

        // 選択した日付以外のスケジュールをフィルターで抽出
        const existsDates = copySchedule.filter(str => !!!this.isScheduleExists(str, dateStrsOfOneDay));
        // 抽出されたデータの長さが48(= 一日分のデータ長)ならフィルターをかけたデータを返す
        if (copySchedule.length - existsDates.length === 48) {
            return existsDates;
        } else {
            dateStrsOfOneDay.forEach(str => {
                if (!!!this.isScheduleExists(str, copySchedule)) copySchedule.push(str);
            });
            return copySchedule;
        }
    }

    public setOneTimeSchedules(dates: string[], schedule: string[]): string[] {
        const copySchedule = schedule.slice();

        // 選択した日付以外のスケジュールをフィルターで抽出
        const existsDates = copySchedule.filter(str => !!!this.isScheduleExists(str, dates));
        // 抽出されたデータの長さが7(= 指定時間の一週間分のデータ長)ならフィルターをかけたデータを返す
        if (copySchedule.length - existsDates.length === 7) {
            return existsDates;
        } else {
            dates.forEach(str => {
                if (!!!this.isScheduleExists(str, copySchedule)) copySchedule.push(str);
            });
            return copySchedule;
        }
    }

    /**
     * 表示する週を引数によって加減する
     * @param n 1 or -1
     */
    public setWeek(n: number): void {
        let _newWeeks = [];
        this.oneWeekAsMoment.pipe(map(weeks => weeks.map(m => m.add(n, 'w'))))
            .subscribe(
                newWeeks => _newWeeks = newWeeks,
                err => console.log(err),
                () => this.oneWeekAsMoment.next(_newWeeks)
            );
    }

    //////////////////////////////////////////////////////// Getters ////////////////////////////////////////////////////////
    get _dayOfWeek(): Observable<Date[]> { return this.oneWeekAsMoment.pipe(map(week => week.map(date => date.toDate()))) }
    get _leftLine(): string[] { return this.leftLineValues }
    get _timeZone(): Observable<string> { return this.timeZone.pipe(map(str => str)) }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
