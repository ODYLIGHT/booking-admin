import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SearchCustomerState } from '../register-booking.store';

@Component({
    selector: 'app-search-customer',
    templateUrl: './search-customer.component.html',
    styleUrls: ['./search-customer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCustomerComponent implements OnInit, OnChanges {
    public customerForm: FormGroup;
    private _customer: SearchCustomerState;
    @Input()
    set customer(item: SearchCustomerState) { this._customer = item }
    get customer() { return this._customer }
    @Output() searchEvent = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    ngOnChanges(changes: { [popKey: string]: SimpleChange }) {
        if (changes.customer.isFirstChange()) return;
        this.customerForm.reset(changes.customer.currentValue);
    }

    private createForm(): void { this.customerForm = this.fb.group(this.customer) }

    public onSubmit(form: FormGroup): void {
        this.searchEvent.emit(form.value);
    }

}
