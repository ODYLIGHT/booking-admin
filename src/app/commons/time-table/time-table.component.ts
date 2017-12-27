import {
    Component, OnInit, OnChanges, Input, Output,
    EventEmitter, SimpleChange, ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { map} from 'rxjs/operators';
import { TimeTableService } from './time-table.service';
import { Moment } from 'moment-timezone';
import { TeacherSchedulesState } from '../../store/types';

/**
 *
 * このコンポーネントは、タイムテーブルの表示部分のみを管理する
 * チェックなどのイベントはすべて親コンポーネントに伝播してデータ操作を行う
 *
 */

@Component({
    selector: 'app-time-table',
    templateUrl: './time-table.component.html',
    styleUrls: ['./time-table.component.scss'],
    providers: [TimeTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTableComponent implements OnInit, OnChanges {
    private _timeZone: string;
    @Input()
    set timeZone(tz: string) { this._timeZone = tz || '' }
    get timeZone() { return this._timeZone }
    private _isOnlyView: boolean;
    @Input()
    set isOnlyView(bool: boolean) { this._isOnlyView = bool }
    get isOnlyView() { return this._isOnlyView }
    private _schedules: TeacherSchedulesState;
    @Input()
    set schedules(sc: TeacherSchedulesState) { this._schedules = sc || { currentSchedules: [], insertSchedules: [], deleteSchedules: [] } }
    get schedules() { return this._schedules }
    private _additionalNumber: number;
    @Input()
    set additionalNumber(n: number) { this._additionalNumber = n || 0 };
    get additionalNumber() { return this._additionalNumber }
    @Output() datePropagator = new EventEmitter<Date[]>();

    // 仮変数を定義しておく
    dayOfWeek: Date[];
    leftColumns: string[];

    constructor(private service: TimeTableService) { }

    ngOnInit() {
        this.initializer();
    }

    ngOnChanges(changes: { [popKey: string]: SimpleChange }) {
        for (const propName in changes) {
            if (changes.hasOwnProperty(propName)) {
                if (propName === 'timeZone') {
                    const changedProp = changes[propName];
                    const _tz = changedProp.currentValue;
                    this.dayOfWeek = this.service.getHeaderDates(_tz);
                    this.datePropagator.emit(this.dayOfWeek);
                } else if (propName === 'additionalNumber' && !!!changes[propName].firstChange) {
                    this.dayOfWeek = this.service.getAddedWeek(this.dayOfWeek, changes[propName]);
                    this.datePropagator.emit(this.dayOfWeek);
                }
            }
        }
    }

    private initializer(): void {
        this.leftColumns = this.service.getLeftColumns;
    }

    public concatTimeStr(idx: number) {
        return this.leftColumns[idx + 1]
            ? `${this.leftColumns[idx]} - ${this.leftColumns[idx + 1]}`
            : `${this.leftColumns[idx]} - 24:00`
            ;
    }

    public convertDateForUTC(date: Date, time: string) { return this.service.convertDate(date, time) }

    public isChecked(utcTimeStr: string) {
        const idx = this._schedules.currentSchedules.indexOf(utcTimeStr);
        return idx >= 0 ? true : false;
    }

    public onClick(str: string) {
        console.log(str);
    }

}
