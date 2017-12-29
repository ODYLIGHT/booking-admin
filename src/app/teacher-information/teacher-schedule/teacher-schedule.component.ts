import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TeacherScheduleService } from './teacher-schedule.service';
import {
    OperationsStore, OptionItemsState,
    TeacherScheduleStore
} from './teacher-schedule.store';
import { ScheduleState, TeacherSchedulesState } from '../../store/types';

@Component({
    templateUrl: './teacher-schedule.component.html',
    styleUrls: ['./teacher-schedule.component.scss'],
    providers: [TeacherScheduleService, OperationsStore, TeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherScheduleComponent implements OnInit {
    // public teacher = new BehaviorSubject(null);
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

    public clickEventObserver(event: { targetColumn: string; action: string; value: string; }) {
        this.service.updateScheduleState(event);
    }

    public get optionsAsObservable$(): Observable<OptionItemsState[]> { return this.service.getOperationsItems$ }

    public get scheduleAsObsevable$(): Observable<TeacherSchedulesState> { return this.service.getSchedules$ }

}
