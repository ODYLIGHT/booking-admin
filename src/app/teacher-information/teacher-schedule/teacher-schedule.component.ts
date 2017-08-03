import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { TeacherScheduleService } from './teacher-schedule.service';
import { TeacherScheduleStore } from './teacher-schedule.store';
import { ScheduleState } from '../../store/types';

@Component({
    templateUrl: './teacher-schedule.component.html',
    styleUrls: ['./teacher-schedule.component.scss'],
    providers: [TeacherScheduleService, TeacherScheduleStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherScheduleComponent implements OnInit {

    constructor(
        private service: TeacherScheduleService
    ) { }

    ngOnInit() { this.service.getInit() }

    public get getScheduleAsObservable$(): Observable<ScheduleState[]> { return this.service.getItems$.map(s => s) }

}
