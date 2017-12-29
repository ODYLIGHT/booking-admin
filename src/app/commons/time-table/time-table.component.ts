import {
    Component, OnInit, OnChanges, Input, Output,
    EventEmitter, SimpleChange, ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { map} from 'rxjs/operators';
import { TimeTableService } from './time-table.service';
import { Moment } from 'moment-timezone';
import { TeacherSchedulesState, CustomerReservationState } from '../../store/types';

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
    private _schedules: TeacherSchedulesState = { current: [], insert: [], delete: [] };
    @Input()
    set schedules(sc: TeacherSchedulesState) { this._schedules = sc }
    get schedules() { return this._schedules }
    private _reservations: CustomerReservationState = { current: [], insert: [], delete: [] };
    @Input()
    set reservation(rv: CustomerReservationState) { this._reservations = rv };
    get reservation() { return this._reservations }
    private _additionalNumber: number;
    @Input()
    set additionalNumber(n: number) { this._additionalNumber = n || 0 };
    get additionalNumber() { return this._additionalNumber }
    @Output() datePropagator = new EventEmitter<Date[]>();
    @Output() clickHandler = new EventEmitter<{ targetColumn: string; action: string; value: string; }>();

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

    /**
     * ここのチェックは予約登録時のタイムテーブルで拡張が必要です
     * 現状は講師のスケジュールのみで判別していますが、拡張時は生徒の予約も合わせて判別する必要があります
     */
    public isChecked(utcTimeStr: string) {
        /**
         * deleteに含まていてもこのままじゃチェックが入ってしまう気がする
         */
        ///////////////////////////////////////////////// スケジュールのチェック ///////////////////////////////////////////////////////
        // `currentSchedule`,`insertSchedule`の配列を結合
        const concatSchedules = this.schedules.current.concat(this.schedules.insert);
        // 重複の削除したうえで存在のチェック
        const isIncludedInSchedule: boolean =
            (Array.from(new Set(concatSchedules))).includes(utcTimeStr) && !!!this.schedules.delete.includes(utcTimeStr);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////// 予約のチェック ///////////////////////////////////////////////////////////////
        let isIncludedInReservation: boolean;
        if (this.reservation) { /* 予約情報更新時の処理 */ }
        else isIncludedInReservation = false;
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (!!!isIncludedInSchedule && !!!isIncludedInReservation) return false;
        else if (isIncludedInSchedule) return 'scheduled';
        else return 'reserved';
    }

    /**
     * 選択した時間がスケジュール・予約に含まれているかどうか判別し、親コンポーネントにイベントを通知する
     * @param utcTimeStr 選択されたタイムテーブルのUTC時間
     * @return { targetColumn: string, action: 'add' or 'del', value: time string for UTC }
     */
    public onClick(utcTimeStr: string) {
        let requestObj: { targetColumn: string; action: string; value: string; };
        if (this.schedules.current.includes(utcTimeStr) || this.reservation.current.includes(utcTimeStr)) {
            // DB取得データ内に存在する場合は、`delete`カラムを操作する
            requestObj = {
                targetColumn: 'delete',
                action: this.schedules.delete.includes(utcTimeStr) || this.reservation.delete.includes(utcTimeStr) ? 'del' : 'add',
                value: utcTimeStr
            };
        } else {
            // DB取得データには存在しない場合は、`insert`カラムを操作する
            requestObj = {
                targetColumn: 'insert',
                action: this.schedules.insert.includes(utcTimeStr) || this.reservation.insert.includes(utcTimeStr) ? 'del' : 'add',
                value: utcTimeStr
            };
        }
        this.clickHandler.emit(requestObj);
    }

}
