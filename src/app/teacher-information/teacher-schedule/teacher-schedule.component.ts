import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TeacherScheduleService } from './teacher-schedule.service';
import {
    OperationsStore, OptionItemsState,
    TeacherScheduleStore
} from './teacher-schedule.store';
import { TimeState } from '../../store/types';

@Component({
    templateUrl: './teacher-schedule.component.html',
    styleUrls: ['./teacher-schedule.component.scss'],
    providers: [TeacherScheduleService, OperationsStore, TeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherScheduleComponent implements OnInit {
    protected teacher: OptionItemsState;

    constructor(
        private service: TeacherScheduleService,
        private operationsStore: OperationsStore,
        private scheduleStore: TeacherScheduleStore
    ) { }

    ngOnInit() { this.service.initComponentItems() }

    public onSelect(value: OptionItemsState) {
        this.service.getScheduleApi(value);
        this.teacher = value;
    }

    public onSubmit(value: OptionItemsState) {
        const _id = value.id;
        const confirmMes = `Update ${value.name}'s schedules?`;
        if (window.confirm(confirmMes)) this.service.updateApi(_id);
    }

    public clickEventObserver(event: { targetColumn: string; action: string; value: string; }) {
        this.service.updateScheduleState(event);
    }

    public get optionsAsObservable$(): Observable<OptionItemsState[]> { return this.service.getOperationsItems$ }

    public get scheduleAsObsevable$(): Observable<TimeState> { return this.service.getSchedules$ }

}
