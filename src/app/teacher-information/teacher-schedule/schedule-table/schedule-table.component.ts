import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { OptionItemsState } from '../teacher-schedule.store';
import { ScheduleState } from '../../../store/types';
import { MomentService } from '../../../services/moment.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Moment } from 'moment-timezone';

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit {
    @Input() teacher: BehaviorSubject<OptionItemsState>;
    private schedules: string[] = [];

    constructor(private moment: MomentService) { }

    ngOnInit() { this.initMoment() }

    private initMoment(): void {
        this.teacher.subscribe(teacher => {
            this.resetSchedule();
            if (!!teacher) this.moment.init(teacher.time_zone);
        });
    }

    get _dayOfWeek(): BehaviorSubject<Moment[]> { return this.moment._dayOfWeek }

    get _leftLine(): string[] { return this.moment._leftLine }

    get _timeZone(): BehaviorSubject<string> { return this.moment._timeZone }

    /**
     * `date`に`time`を結合した時間文字列(UTC)を返す ex:'YYYY-MM-ddTHH:mm:ssZ'
     * @param date Date
     * @param time　string
     */
    public dateConverter(date: Date, time: string): string { return this.moment.convertedDate(date, time) }

    /**
     * テーブル１列目の時間範囲を作る
     *
     * 与えられた時間文字列の３０分後表示文字列を返す
     *
     * ex: '07:00'が来たら'07:30'、'15:30'なら'16:00'
     */
    public combineTime(timeAry: string[], idx: number): string { return !!!timeAry[idx + 1] ? '24:00' : timeAry[idx + 1] }

    /**
     * 選択した時間文字列を配列に格納する
     * @param date UTC時間文字列
     */
    public changeSchedule(date: string): void {
        // InsertとUpdateを区別したパラメータを用意した方がいいかも
        // サーバーのクエリが楽になると思う
        this.schedules = this.moment.setSchedules(date, this.schedules);
        console.log(this.schedules);
    }

    /**
     * 講師の選択が行われた場合、格納されていたスケジュールを初期化する
     */
    private resetSchedule(): void { this.schedules = [] }



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
