import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CheckTeacherScheduleService, TeachersNameState } from './check-teacher-schedule.service';
import { CheckTeacherScheduleStore } from './check-teacher-schedule.store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-check-teacher-schedule',
    templateUrl: './check-teacher-schedule.component.html',
    styleUrls: ['./check-teacher-schedule.component.scss'],
    providers: [CheckTeacherScheduleService, CheckTeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckTeacherScheduleComponent implements OnInit {
    public teachersAsObservable = new BehaviorSubject<TeachersNameState[]>(null);

    constructor(
        private service: CheckTeacherScheduleService
    ) { }

    ngOnInit() {
        this.service.getTeachers().subscribe(items => this.teachersAsObservable.next(items));
    }

    public search(event) { this.service.getSchedule(event) }

}
