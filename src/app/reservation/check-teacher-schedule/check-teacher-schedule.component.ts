import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PersonalInformationState } from '../../store/types';

import { CheckTeacherScheduleService } from './check-teacher-schedule.service';
import { TeacherStore, CheckScheduleState, CheckTeacherScheduleStore } from './check-teacher-schedule.store';

@Component({
    selector: 'app-check-teacher-schedule',
    templateUrl: './check-teacher-schedule.component.html',
    styleUrls: ['./check-teacher-schedule.component.scss'],
    providers: [CheckTeacherScheduleService, TeacherStore, CheckTeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckTeacherScheduleComponent implements OnInit {

    constructor(private service: CheckTeacherScheduleService) { }

    ngOnInit() { this.service.initGetTeacherApi() }

    public onSearch(params): void { this.service.GetScheduleApi(params) }

    public get teachersAsObservable$(): Observable<PersonalInformationState[]> { return this.service.getTeachers$ }
    public get schedulesAsObservable$(): Observable<CheckScheduleState> { return this.service.getSchedules$ }

}
