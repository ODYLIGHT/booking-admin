import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-information-form',
    templateUrl: './information-form.component.html',
    styleUrls: ['./information-form.component.scss']
})
export class InformationFormComponent implements OnInit {
    public searchForm: FormGroup;
    @Output() searchEvent = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() { this.createForm() }

    private createForm(): void {
        /**
         * 現在検索対象カラムは４つです（2018/01/16）
         */
        this.searchForm = this.fb.group({
            id: null,
            name: '',
            mail_address: '',
            skype_name: ''
        });
    }

    public onSubmit(form: FormGroup): void { this.searchEvent.emit(form.value) }

}
