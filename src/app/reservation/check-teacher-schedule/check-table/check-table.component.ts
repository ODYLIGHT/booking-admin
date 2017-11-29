import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ScheduleState, CheckTeacherScheduleState } from '../../../store/types';

@Component({
    selector: 'app-check-table',
    templateUrl: './check-table.component.html',
    styleUrls: ['./check-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckTableComponent implements OnInit {
    @Input() schedules: CheckTeacherScheduleState;

    constructor() { }

    ngOnInit() { }

    private createThead(items: CheckTeacherScheduleState): number[] {
        if (!!!Object.keys(items).length) return;
        const timeStamps = [new Date(items.schedules[0]._date).getTime()];
        for (let i = 0; i < 6; i++) {
            timeStamps.push(timeStamps[i] + (60 * 60 * 24 * 1000));
        };
        return timeStamps;
    }

    public convertSchedules(items: CheckTeacherScheduleState) {
        if (!!!Object.keys(items).length) return;
        const rows = [];
        for (let i = 0; i < 24; i++) {
            const zeroMinutes = [];
            const halfMinutes = [];
            items.schedules.forEach(obj => {
                const thisDate = new Date(obj._date);
                if (thisDate.getHours() === i) {
                    if (thisDate.getMinutes() === 0) zeroMinutes.push(obj);
                    else if (thisDate.getMinutes() === 30) halfMinutes.push(obj);
                }
            });
            const hour = `0${i}`.slice(-2);
            rows.push({ title: `${hour}.00-${hour}.30`, values: zeroMinutes });
            rows.push({ title: `${hour}.30-${('0' + (i + 1)).slice(-2)}.00`, values: halfMinutes });
        };
        return rows;
    }

    public getThisSchedule(obj: ScheduleState) {
        // 予約情報から予約者を返したいけど名前取得してなかった・・・
        // とりあえずIDかえす？
        if (!!obj._can_reserve) return 'Available';

        const isReservation = this.schedules.reservations.filter(o => {
            return new Date(o._reserve_date).getTime() === new Date(obj._date).getTime();
        });
        if (isReservation.length) return `user ID: ${obj._reserved_user}`;
        else return '';
    }

}
