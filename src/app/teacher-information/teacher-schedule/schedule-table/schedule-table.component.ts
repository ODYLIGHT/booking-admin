import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleState } from '../../../store/types';

@Component({
    selector: 'app-schedule-table',
    templateUrl: './schedule-table.component.html',
    styleUrls: ['./schedule-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit {
    @Input() schedules: ScheduleState[];
    public showsWeeks: Date[] = [];
    public rows = [];

    constructor() { }

    ngOnInit() {
        this.setTheadTitles();
        this.setRows();
    }

    /**
     * 今日の日付の曜日整数（0~6）を取得
     * 日曜日を起点にする今日が含まれる一週間の配列を作成
     */
    private setTheadTitles(): void {
        const today: Date = new Date();
        const weekNumberOfToday: number = today.getDay();
        for (let i = 0; i < 7; i++) {
            const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - (weekNumberOfToday - i));
            this.showsWeeks.push(d);
        }
    }
    private setRows(): void {
        for (let i = 0; i < 24; i++) {
            this.rows.push(i < 10 ? `0${i}:00-0${i}:30` : `${i}:00-${i}:30`);
            this.rows.push(i < 10 ? i === 9 ? `0${i}:30-${i + 1}:00` : `0${i}:30-0${i + 1}:00` : `${i}:30-${i + 1}:00`);
        }
    }

}
