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
    providers: [ScheduleTableService, TeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTableComponent implements OnInit, OnChanges {
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
    @Output() clickEventProvider = new EventEmitter<{ targetColumn: string; action: string; value: string; }>();

    constructor(
        private moment: MomentService,
        private service: ScheduleTableService,
        private store: TeacherScheduleStore
    ) { }

    ngOnInit() { }

    ngOnChanges(changes: { [popKey: string]: SimpleChange }) {
    }

    public get getTimeIntervalFromTimeZone(): string { return this.moment.timeIntervalFromTimeZone(this.teacher.time_zone) }

    public prevWeek() { --this.additionalNumber }

    public nextWeek() { ++this.additionalNumber }

    public observerForDayOfWeek(e: Date[]): void {
        this.weekOfPeriod =
            `${this.service.convertFormat(e[0], 'DD.MMM.YYYY')} - ${this.service.convertFormat(e[6], 'DD.MMM.YYYY')}`;
    }

    public clickObserver(event: { targetColumn: string; action: string; value: string; }) {
        // time-table.componentから受け取ったクリックイベントはそのまま親コンポーネントに渡してstateを更新する
        this.clickEventProvider.emit(event);
    }
}
