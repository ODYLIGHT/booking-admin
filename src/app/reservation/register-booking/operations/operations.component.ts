import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { TeacherForOptionState, SearchCustomerState, OperationsState, initOptionsState } from '../register-booking.store';

@Component({
    selector: 'app-operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsComponent implements OnInit, OnChanges {
    public operationsForm: FormGroup;
    private _teachers: TeacherForOptionState[];
    @Input()
    set teachers(item: TeacherForOptionState[]) { this._teachers = item }
    get teachers() { return this._teachers }
    private _operations: OperationsState;
    @Input()
    set operations(item: OperationsState) { this._operations = item }
    get operations() { return this._operations }
    @Output() searchEvent = new EventEmitter();
    @Output() selectEvent: EventEmitter<TeacherForOptionState> = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnChanges(changes: { [popKey: string]: SimpleChange }) {
        if (!!!changes.operations || changes.operations.isFirstChange()) return;
        this.operationsForm.reset(changes.operations.currentValue);
    }

    private createForm(): void {
        this.operationsForm = this.fb.group({
            customer: this.fb.group(this.operations.customer),
            teacher: this.fb.group(initOptionsState)
        });
    }

    public onSubmit(form: FormGroup): void {
        // フォームの顧客情報の初期化 ビューの`Customer Name`がちらつく
        // this.operationsForm.patchValue({ customer: { id: form.value.customer.id, name: '', time_zone: '' } });
        this.searchEvent.emit(form.value);
    }

    public onChange(e: MatSelectChange): void {
        const idx = e.value;
        this.operationsForm.patchValue({ teacher: this.teachers[idx] });
    }

}
