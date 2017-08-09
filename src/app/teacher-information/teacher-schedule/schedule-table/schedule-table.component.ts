import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleState } from '../../../store/types';

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit {
    @Input() schedules: { title: string; value: ScheduleState[] }[];
    @Input() showsWeeks: Date[];
    @Output() switchWeek = new EventEmitter();
    @Output() copyPrev = new EventEmitter();
    @Output() post = new EventEmitter();
    private rowBools: boolean[] = [];
    private lineBools: boolean[] = [];

    constructor() { }

    ngOnInit() { }

    public onClick(obj) { obj._can_reserve = !obj._can_reserve }

    public onSelectAday(idx: number) {
        this.schedules.forEach((obj, index, array) => {
            obj.value[idx]._can_reserve = !!this.lineBools[idx];
        });
        this.lineBools[idx] = !this.lineBools[idx];
    }

    public onSelectAhour(idx: number) {
        this.schedules[idx].value.forEach((schedule, index, array) => {
            schedule._can_reserve = !!this.rowBools[idx];
        });
        this.rowBools[idx] = !this.rowBools[idx];
    }

    public onClickBtn(str: string): void {
        this.schedules.forEach((obj, index, array) => {
            obj.value.forEach((schedule, i, a) => {
                schedule._can_reserve = (str === 'check') ? false : true;
                this.lineBools[i] = (str === 'check') ? true : false;
            });
            this.rowBools[index] = (str === 'check') ? true : false;
        });
    }

    public onClickCopyPrev(): void {
        this.copyPrev.emit();
    }

    public onClickSwitchWeek(str: string): void {
        this.switchWeek.emit(str === 'next' ? 7 : -7);
    }

    public onPost() {
        this.post.emit();
    }

}
