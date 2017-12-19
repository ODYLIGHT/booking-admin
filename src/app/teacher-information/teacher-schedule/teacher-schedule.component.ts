import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TeacherScheduleService } from './teacher-schedule.service';
import {
    OperationsStore, OptionItemsState,
    TeacherScheduleStore
} from './teacher-schedule.store';
import { ScheduleState } from '../../store/types';

@Component({
    templateUrl: './teacher-schedule.component.html',
    styleUrls: ['./teacher-schedule.component.scss'],
    providers: [TeacherScheduleService, OperationsStore, TeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherScheduleComponent implements OnInit {
    public teacher = new BehaviorSubject(null);

    constructor(
        private service: TeacherScheduleService,
        private operationsStore: OperationsStore,
        private scheduleStore: TeacherScheduleStore
    ) { }

    ngOnInit() { this.service.initComponentItems() }

    public onSelect(value: OptionItemsState) {
        this.teacher.next(value);
    }

    public get optionsAsObservable$(): Observable<OptionItemsState[]> { return this.service.getOperationsItems$ }

    // public showsWeeks: Date[];
    // public rows = [];
    // private allSchedule: ScheduleState[];
    // public mainSchedule: { title: string; JSON.parse(value): ScheduleState[] }[] = []; // convert schedules.
    // public lengthOfOneDay = 48; // スケジュール1日のデータ数
    // private moment: moment.Moment = moment();

    // constructor(
    //     private service: TeacherScheduleService
    // ) { }

    // ngOnInit() {
    //     this.service.getInit();
    //     this.moment.locale('ja');
    //     this.setTheadTitles();
    //     this.setRows();
    // }

    // public get getScheduleAsObservable$(): Observable<{ title: string; value: ScheduleState[] }[]> {
    //     return this.service.getItems$.map(s => this.convertSchedule(s));
    // }

    // /**
    //  * 今日の日付の曜日整数（0~6）を取得
    //  * 日曜日を起点にする今日が含まれる一週間の配列を作成
    //  */
    // private setTheadTitles(setDate?: Date): void {
    //     const today: Date = setDate ? setDate : this.moment.toDate();
    //     const weekNumberOfToday: number = this.moment.day();
    //     this.showsWeeks = [];
    //     for (let i = 0; i < 7; i++) {
    //         const d = new Date(this.moment.year(), this.moment.month(), this.moment.date() - (weekNumberOfToday - i));
    //         this.showsWeeks.push(d);
    //     }
    // }
    // private setRows(): void {
    //     for (let i = 0; i < 24; i++) {
    //         this.rows.push(i < 10 ? `0${i}:00-0${i}:30` : `${i}:00-${i}:30`);
    //         this.rows.push(i < 10 ? i === 9 ? `0${i}:30-${i + 1}:00` : `0${i}:30-0${i + 1}:00` : `${i}:30-${i + 1}:00`);
    //     }
    // }

    // private filterFromWeek(timeStr: string, index: number, schedule: ScheduleState[]) {
    //     const needSchedule = schedule.filter((obj, i, a) => {
    //         if (
    //             i === index ||
    //             i === this.lengthOfOneDay + index ||
    //             i === 2 * this.lengthOfOneDay + index ||
    //             i === 3 * this.lengthOfOneDay + index ||
    //             i === 4 * this.lengthOfOneDay + index ||
    //             i === 5 * this.lengthOfOneDay + index ||
    //             i === 6 * this.lengthOfOneDay + index ||
    //             i === 7 * this.lengthOfOneDay + index
    //         ) return true;
    //     });
    //     return {
    //         title: timeStr,
    //         value: needSchedule
    //     };
    // }

    // public convertSchedule(scheduleArray: ScheduleState[]) {
    //     this.allSchedule = scheduleArray || [];
    //     const thisYear = new Date().getFullYear();
    //     // その年の1月1日からの経過日数
    //     const numberOfDaysElapsed: number = moment(this.showsWeeks[0]).diff([thisYear, 0, 1], 'days');
    //     const startIndex = numberOfDaysElapsed * this.lengthOfOneDay;
    //     const endIndex = startIndex + (this.lengthOfOneDay * 7);
    //     const mainSchedule = this.allSchedule.slice(startIndex, endIndex);
    //     this.mainSchedule = [];
    //     this.rows.forEach((timeStr, idx, ary) => {
    //         this.mainSchedule.push(this.filterFromWeek(timeStr, idx, mainSchedule));
    //     });
    //     return this.mainSchedule;
    // }

    // public copyPrev(event) {
    //     const aWeekBeforeDayMoment = this.moment.clone().subtract(7, 'days');
    //     const thisYear = new Date().getFullYear();
    //     const startDayOfPrevWeek = new Date(
    //         aWeekBeforeDayMoment.year(),
    //         aWeekBeforeDayMoment.month(),
    //         aWeekBeforeDayMoment.date() - aWeekBeforeDayMoment.day()
    //     );
    //     const numberOfDaysElapsed = moment(startDayOfPrevWeek).diff([thisYear, 0, 1], 'days');
    //     const prevStartIndex = numberOfDaysElapsed * this.lengthOfOneDay;
    //     const prevEndIndex = prevStartIndex + (this.lengthOfOneDay * 7);
    //     const nextEndIndex = prevEndIndex + (this.lengthOfOneDay * 7);
    //     const prevSchedule = this.allSchedule.slice(prevStartIndex, prevEndIndex);
    //     const currentSchedule = this.allSchedule.slice(prevEndIndex, nextEndIndex);

    //     prevSchedule.forEach((obj, i, ary) => {
    //         if (!!!currentSchedule[i]) return;
    //         currentSchedule[i]._can_reserve = obj._can_reserve;
    //     });
    // }

    // public switchWeek(event): void {
    //     this.moment = this.moment.add(event, 'days');
    //     this.setTheadTitles(this.moment.toDate());
    // }

    // public post(event): void {
    //     console.log(`api call schedule update...`);
    //     this.service.putSchedule(this.allSchedule);
    // }

}
