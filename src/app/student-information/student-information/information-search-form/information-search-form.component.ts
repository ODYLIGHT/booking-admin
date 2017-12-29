import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-information-search-form',
    templateUrl: './information-search-form.component.html',
    styleUrls: ['./information-search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationSearchFormComponent implements OnInit {
    @Output() searchEvent = new EventEmitter();
    private studentIdCtrl: FormControl;
    private studentNameCtrl: FormControl;
    private phoneNumberCtrl: FormControl;
    private mailAddressCtrl: FormControl;
    private skypeNameCtrl: FormControl;
    private dateCtrl: FormControl;
    private teacherNameCtrl: FormControl;
    public searchFormCtrls: FormGroup;

    constructor() { }

    ngOnInit() {
        this.formInit();
    }

    private formInit(): void {
        this.studentIdCtrl = new FormControl({ value: '', disabled: false });
        this.studentNameCtrl = new FormControl({ value: '', disabled: false });
        this.phoneNumberCtrl = new FormControl({ value: '', disabled: false });
        this.mailAddressCtrl = new FormControl({ value: '', disabled: false });
        this.skypeNameCtrl = new FormControl({ value: '', disabled: false });
        this.dateCtrl = new FormControl({ value: '', disabled: false });
        this.teacherNameCtrl = new FormControl({ value: '', disabled: false });
        this.searchFormCtrls = new FormGroup({
            studentId: this.studentIdCtrl,
            studentName: this.studentNameCtrl,
            phoneNumber: this.phoneNumberCtrl,
            mailAddress: this.mailAddressCtrl,
            skypeName: this.skypeNameCtrl,
            date: this.dateCtrl,
            teacherName: this.teacherNameCtrl
        });
    }

    public onSearch(form: FormGroup) { this.searchEvent.emit(form.value) }

}
