import {
    Component, OnInit, OnChanges, Input, Output,
    EventEmitter, SimpleChange, ChangeDetectionStrategy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { map} from 'rxjs/operators';
import { TimeTableService } from './time-table.service';
import { Moment } from 'moment-timezone';
import { TimeState, CustomerReservationState } from '../../store/types';

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
    private _timeState: TimeState = { current: [], insert: [], delete: [] };
    @Input()
    set timeState(ts: TimeState) { this._timeState = ts }
    get timeState() { return this._timeState }
    private _canNotReserve: string[];
    @Input()
    set canNotReserve(cnr: string[]) { this._canNotReserve = cnr };
    get canNotReserve() { return this._canNotReserve || [] }
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


    public isChecked(utcTimeStr: string) {
        ///////////////////////////////////////////////// timeStateのチェック ///////////////////////////////////////////////////////
        // `current`,`insert`の配列を結合
        const concatTimeState = this.timeState.current.concat(this.timeState.insert);
        // 重複の削除したうえで存在のチェック
        const isIncludedInTimeState: boolean =
            (Array.from(new Set(concatTimeState))).includes(utcTimeStr) && !!!this.timeState.delete.includes(utcTimeStr);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////// canNotReserveのチェック ///////////////////////////////////////////////////////////////
        // let isIncludedInReservation: boolean;
        // if (this.reservation) { /* 予約情報更新時の処理 */ }
        // else isIncludedInReservation = false;
        const isIncludedInCanNotReserve: boolean = this.canNotReserve.includes(utcTimeStr);
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (!!!isIncludedInTimeState && !!!isIncludedInCanNotReserve) return false;
        else if (isIncludedInTimeState) return 'scheduled';
        else return 'reserved';
    }

    /**
     * 選択した時間がtimeState・canNotReserveに含まれているかどうか判別し、親コンポーネントにイベントを通知する
     * @param utcTimeStr 選択されたタイムテーブルのUTC時間
     * @return { targetColumn: string, action: 'add' or 'del', value: time string for UTC }
     */
    public onScheduledSigleTime(utcTimeStr: string) {
        const isCurrent = this.timeState.current.includes(utcTimeStr);
        // isCurrent === true: DB取得データ内に存在する場合は、`delete`カラムを操作する
        // isCurrent === false: DB取得データには存在しない場合は、`insert`カラムを操作する
        const requestObj: { targetColumn: string; action: string; value: string; } = {
            targetColumn: isCurrent ? 'delete' : 'insert',
            action: isCurrent
                ? this.timeState.delete.includes(utcTimeStr) ? 'del' : 'add'
                : this.timeState.insert.includes(utcTimeStr) ? 'del' : 'add',
            value: utcTimeStr
        }
        this.clickHandler.emit(requestObj);
    }

    public onScheduledMultipleTime(date: Date | Date[], time: string | string[]) {
        let allTimes: string[];
        if (date instanceof Date && time instanceof Array) {
            // テーブルヘッダーの日付クリック時　１日の全時間帯のStateを操作する
            allTimes = time.map(_time => this.convertDateForUTC(date, _time));
        } else if (date instanceof Array && typeof time === 'string') {
            // 時間帯クリック時　その時間帯の一週間分のStateを操作する
            allTimes = date.map(_date => this.convertDateForUTC(_date, time));
        }
        allTimes.forEach(utcTimeStr => this.onScheduledSigleTime(utcTimeStr));
    }

}
