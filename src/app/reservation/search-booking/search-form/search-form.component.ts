import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit {
    @Output() searchEvent = new EventEmitter();
    private customerIdCtrl: FormControl;
    private customerNameCtrl: FormControl;
    private phoneNumberCtrl: FormControl;
    private mailAddressCtrl: FormControl;
    private skypeNameCtrl: FormControl;
    private reserveDateCtrl: FormControl;
    private teacherNameCtrl: FormControl;
    public searchFormCtrls: FormGroup;

    constructor() { }

    ngOnInit() {
        this.formInit();
        this.searchFormCtrls.valueChanges.subscribe(v => {
            this.seachCustomer();
            this.searchTeahcer();
        })
    }

    private formInit(): void {
        this.customerIdCtrl = new FormControl({value: '', disabled: false});
        this.customerNameCtrl = new FormControl({value: '', disabled: false});
        this.phoneNumberCtrl = new FormControl({value: '', disabled: false});
        this.mailAddressCtrl = new FormControl({value: '', disabled: false});
        this.skypeNameCtrl = new FormControl({value: '', disabled: false});
        this.reserveDateCtrl = new FormControl({value: '', disabled: false});
        this.teacherNameCtrl = new FormControl({value: '', disabled: false});
        this.searchFormCtrls = new FormGroup({
            customerId: this.customerIdCtrl,
            customerName: this.customerNameCtrl,
            phoneNumber: this.phoneNumberCtrl,
            mailAddress: this.mailAddressCtrl,
            skypeName: this.skypeNameCtrl,
            reserveDate: this.reserveDateCtrl,
            teacherName: this.teacherNameCtrl
        });
    }

    public seachCustomer(): void {
        (
            this.searchFormCtrls.value.customerId
            || this.searchFormCtrls.value.customerName
            || this.searchFormCtrls.value.phoneNumber
            || this.searchFormCtrls.value.mailAddress
            || this.searchFormCtrls.value.skypeName
            || this.searchFormCtrls.value.reserveDate
        ) ? this.teacherNameCtrl.disable({ onlySelf: true }) : this.teacherNameCtrl.enable({ onlySelf: true });
    }

    public searchTeahcer(): void {
        if (this.searchFormCtrls.value.teacherName) {
            this.customerIdCtrl.disable({ onlySelf: true });
            this.customerNameCtrl.disable({ onlySelf: true });
            this.phoneNumberCtrl.disable({ onlySelf: true });
            this.mailAddressCtrl.disable({ onlySelf: true });
            this.skypeNameCtrl.disable({ onlySelf: true })
            this.reserveDateCtrl.disable({ onlySelf: true });
        } else {
            this.customerIdCtrl.enable({ onlySelf: true });
            this.customerNameCtrl.enable({ onlySelf: true });
            this.phoneNumberCtrl.enable({ onlySelf: true });
            this.mailAddressCtrl.enable({ onlySelf: true });
            this.skypeNameCtrl.enable({ onlySelf: true })
            this.reserveDateCtrl.enable({ onlySelf: true });
        }
    }

    public onSearch(form: FormGroup) {
        this.searchEvent.emit(form.value);
    }

}
