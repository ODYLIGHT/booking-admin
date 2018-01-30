import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import { PersonalInformationState } from '../../../store/types';
import { OperationsState } from '../register-booking.store';

@Component({
    selector: 'app-operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsComponent implements OnInit, OnChanges {
    public operationsForm: FormGroup;
    private _teachers: PersonalInformationState[];
    @Input()
    set teachers(item: PersonalInformationState[]) { this._teachers = item }
    get teachers() { return this._teachers }
    private _operations: OperationsState;
    @Input()
    set operations(item: OperationsState) { this._operations = item }
    get operations() { return this._operations }
    @Output() searchEvent = new EventEmitter();
    @Output() registerEvent = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnChanges(changes: { [popKey: string]: SimpleChange }) {
        if (!!!changes.operations || changes.operations.isFirstChange()) return;
        this.operationsForm.patchValue({ customer: changes.operations.currentValue.customer });
    }

    private createForm(): void {
        this.operationsForm = this.fb.group({
            customer: this.fb.group(
                { ...this.operations.customer, name: `${this.operations.customer.name_first} ${this.operations.customer.name_last}` }
            ),
            teacherIdx: [null, Validators.required]
        });
    }

    public onSubmit(form: FormGroup): void {
        const submitValue = { customer: form.value.customer, teacher: this.teachers[form.value.teacherIdx] };
        this.searchEvent.emit(submitValue);
    }

    public onRegister(): void { this.registerEvent.emit() }
}
