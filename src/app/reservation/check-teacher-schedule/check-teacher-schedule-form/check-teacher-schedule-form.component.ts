import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { PersonalInformationState } from '../../../store/types';

@Component({
    selector: 'app-check-teacher-schedule-form',
    templateUrl: './check-teacher-schedule-form.component.html',
    styleUrls: ['./check-teacher-schedule-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckTeacherScheduleFormComponent implements OnInit {
    public searchForm: FormGroup;
    private _teachers: PersonalInformationState[];
    @Input()
    set teachers(items: PersonalInformationState[]) { this._teachers = items }
    get teachers(): PersonalInformationState[] { return this._teachers }
    @Output() searchEvent = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() { this.createForm() }

    private createForm() {
        this.searchForm = this.fb.group({
            index: [null, Validators.required],
            date: ['', Validators.required]
        });
    }

    public onSearch(form: FormGroup): void {
        const submitValue = { teacher: this.teachers[form.value.index], date: form.value.date };
        this.searchEvent.emit(submitValue);
    }

}
