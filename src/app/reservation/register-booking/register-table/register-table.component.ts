import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { RegisterBookingTeachersState, ScheduleState } from '../../../store/types';
import * as moment from 'moment';
import 'moment/locale/ja';

@Component({
  selector: 'app-register-table',
  templateUrl: './register-table.component.html',
  styleUrls: ['./register-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterTableComponent implements OnInit {
    @Input() teachers: RegisterBookingTeachersState[];
    @Input() schedule: { title: string; value: ScheduleState[] }[];
    @Input() showsWeeks: Date[];
    @Input() userId: number;
    @Output() selectTeacher = new EventEmitter();
    @Output() switchWeek = new EventEmitter();
    private moment: moment.Moment = moment();
    private rowBools: boolean[] = [];

  constructor() { }

  ngOnInit() { }

    public onClickSwitchWeek(str): void {
        this.switchWeek.emit(str === 'next' ? 7 : -7);
    }

    public onSelectTeacher(event) {
        const id = event.target.value;
        this.selectTeacher.next(id);
    }

    /**
     * 日付クリック時にすべてチェックをつけるメソッドのベース（使うかは未定）
     * schedule-table.componentと同じ実装になる
     * @param idx インデックス
     */
    public onSelectAday(idx: number) {
        console.log(idx);
    }

    public onClick(obj) {
        // obj._can_reserve = !obj._can_reserve;
        obj._reserved_user = obj._reserved_user === this.userId ? '' : this.userId;
    }

    public onSelectAhour(idx: number) {
        console.log(idx);
        // this.schedule[idx].value.forEach((v, index, array) => {
        //     v._can_reserve = !!this.rowBools[idx];
        // });
        // this.rowBools[idx] = !this.rowBools[idx];
    }

    public isCanReserve(obj): number {
        if (!!!obj._can_reserve) return 0;
        else {
            if (!!!obj._reserved_user || obj._reserved_user === this.userId) return 2;
            else return 1;
        }
    }

}
