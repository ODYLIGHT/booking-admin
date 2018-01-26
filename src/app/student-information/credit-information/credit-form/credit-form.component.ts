import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { CustomerState } from '../../../store/types';

@Component({
    selector: 'app-credit-form',
    templateUrl: './credit-form.component.html',
    styleUrls: ['./credit-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditFormComponent implements OnInit {
    private _profiles: CustomerState;
    @Input()
    set profiles(items) { this._profiles = items }
    get profiles() { return this._profiles }

    @Output() registerEvent = new EventEmitter();
    public creditForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.creditForm = this.fb.group({
            customer_id: [this.profiles.id, Validators.required],
            credit_count: [
                1,
                Validators.compose([Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)])
            ],
            date: [new Date(), Validators.required],
            remarks: ['']
        });
    }

    public onClick(form: FormGroup) {
        if (window.confirm('Do you want to register credit information?')) {
            this.registerEvent.emit(form.value);
            this.creditForm.patchValue({ date: new Date(), credit_count: 1, remarks: '' });
        } else {
            return;
        }
    }

}
