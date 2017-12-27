import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Moment } from 'moment-timezone';

import { MomentService } from '../../../services/moment.service';
import {
    OptionItemsState, TeacherScheduleStore
} from '../teacher-schedule.store';
import { ScheduleTableService } from './schedule-table.service';
import { TeacherSchedulesState } from '../../../store/types';

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.scss'],
    providers: [ScheduleTableService, TeacherScheduleStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnChanges {
    // @Input() teacher: BehaviorSubject<OptionItemsState>;
    private _teacher: OptionItemsState;
    @Input()
    set teacher(item: OptionItemsState) { this._teacher = item || undefined }
    get teacher() { return this._teacher }
    private _schedules: TeacherSchedulesState;
    @Input()
    set schedules(item: TeacherSchedulesState) { this._schedules = item || undefined }
    get schedules() { return this._schedules }
    public weekOfPeriod = '';
    public additionalNumber = 0;

    constructor(
        private moment: MomentService,
        private service: ScheduleTableService,
        private store: TeacherScheduleStore
    ) { }

    ngOnInit() {
        // this.initMoment();
    }

    ngOnChanges(changes: { [popKey: string]: SimpleChange }) {
    }

    public prevWeek() { --this.additionalNumber }

    public nextWeek() { ++this.additionalNumber }

    public observerForDayOfWeek(e: Date[]): void {
        this.weekOfPeriod =
            `${this.service.convertFormat(e[0], 'DD.MMM.YYYY')} - ${this.service.convertFormat(e[6], 'DD.MMM.YYYY')}`;
    }

    // private initMoment(): void {
    //     this.teacher.subscribe(teacher => {
    //         this.resetSchedule();
    //         if (!!teacher) {
    //             this.service.changedTeacherOfState(teacher);
    //             this.moment.init(teacher.time_zone);
    //         }
    //     });
    // }

    // get _teacher(): Observable<Readonly<TeacherSchedulesState>> { return this.service.getTeacherSchedule$ }

    // get _dayOfWeek(): Observable<Date[]> { return this.moment._dayOfWeek }

    // get _leftLine(): string[] { return this.moment._leftLine }

    // get _timeZone(): Observable<string> { return this.moment._timeZone }

    // /**
    //  * `date`に`time`を結合した時間文字列(UTC)を返す ex:'YYYY-MM-ddTHH:mm:ssZ'
    //  * @param date Date
    //  * @param time　string
    //  */
    // public dateConverter(date: Date, time: string): string { return this.moment.convertedDate(date, time) }

    // /**
    //  * テーブル１列目の時間範囲を作る
    //  *
    //  * 与えられた時間文字列の３０分後表示文字列を返す
    //  *
    //  * ex: '07:00'が来たら'07:30'、'15:30'なら'16:00'
    //  */
    // public combineTime(timeAry: string[], idx: number): string { return !!!timeAry[idx + 1] ? '24:00' : timeAry[idx + 1] }

    // /**
    //  * 講師の選択が行われた場合、格納されていたスケジュールを初期化する
    //  */
    // private resetSchedule(): void { this.schedules = [] }

    // /**
    //  * 画面上段の期間を表す文字列を返す
    //  * @param week day of a week
    //  */
    // public getSelectedWeek(week: Moment[]): string { return this.moment.getSelectWeekStr(week) }

    // /**
    //  * 引数`utc`に該当する時間が、スケジュールとして選択されているかの判定
    //  * @param utc 時間文字列
    //  */
    // public selectedChecker(utc: string): boolean { return this.moment.isScheduleExists(utc, this.schedules) }

    // /**
    //  * go to next week.
    //  */
    // public next(): void { this.moment.setWeek(1) }

    // /**
    //  * back to previous week.
    //  */
    // public prev(): void { this.moment.setWeek(-1) }

    // /**
    //  * 選択した時間文字列を配列に格納する
    //  * @param date UTC時間文字列
    //  */
    // public changeSchedule(date: string): void {
    //     // InsertとUpdateを区別したパラメータを用意した方がいいかも
    //     // サーバーのクエリが楽になると思う
    //     this.schedules = this.moment.setSchedules(date, this.schedules);
    //     console.log(this.schedules);
    // }

    // /**
    //  * 1日の全てのスケジュールを追加・削除する
    //  * @param date 選択日付
    //  */
    // public onClickThead(date: Date) {
    //     const momentDate = this.moment.exchangeDateToMoment(date, true);
    //     this.schedules = this.moment.setOneDaySchedules(momentDate, this.schedules);
    // }

    // /**
    //  * 選択した時間帯の一週間分をスケジュールに追加・削除する
    //  * @param timeStr 時間文字列　'HH:mm'
    //  * @param week 現在表示中の一週間分のDate配列
    //  */
    // public onClickLeftLine(timeStr: string, week: Date[]) {
    //     const d = week.map(date => this.dateConverter(date, timeStr));
    //     this.schedules = this.moment.setOneTimeSchedules(d, this.schedules);
    // }


    // @Input() schedules: { title: string; value: ScheduleState[] }[];
    // @Input() showsWeeks: Date[];
    // @Output() switchWeek = new EventEmitter();
    // @Output() copyPrev = new EventEmitter();
    // @Output() post = new EventEmitter();
    // private rowBools: boolean[] = [];
    // private lineBools: boolean[] = [];

    // constructor() { }

    // ngOnInit() { }

    // public onClick(obj) { obj._can_reserve = !obj._can_reserve }

    // public onSelectAday(idx: number) {
    //     this.schedules.forEach((obj, index, array) => {
    //         obj.value[idx]._can_reserve = !!this.lineBools[idx];
    //     });
    //     this.lineBools[idx] = !this.lineBools[idx];
    // }

    // public onSelectAhour(idx: number) {
    //     this.schedules[idx].value.forEach((schedule, index, array) => {
    //         schedule._can_reserve = !!this.rowBools[idx];
    //     });
    //     this.rowBools[idx] = !this.rowBools[idx];
    // }

    // public onClickBtn(str: string): void {
    //     this.schedules.forEach((obj, index, array) => {
    //         obj.value.forEach((schedule, i, a) => {
    //             schedule._can_reserve = (str === 'check') ? false : true;
    //             this.lineBools[i] = (str === 'check') ? true : false;
    //         });
    //         this.rowBools[index] = (str === 'check') ? true : false;
    //     });
    // }

    // public onClickCopyPrev(): void {
    //     this.copyPrev.emit();
    // }

    // public onClickSwitchWeek(str: string): void {
    //     this.switchWeek.emit(str === 'next' ? 7 : -7);
    // }

    // public onPost() {
    //     this.post.emit();
    // }

}
