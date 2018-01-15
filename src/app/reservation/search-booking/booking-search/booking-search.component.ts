import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';

import { PersonalInformationState } from '../../../store/types';

@Component({
    selector: 'app-booking-search',
    templateUrl: './booking-search.component.html',
    styleUrls: ['./booking-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingSearchComponent implements OnInit {
    // Angular FormGroup
    public searchForm: FormGroup;
    // 講師選択プルダウン用アイテム
    private _teachers: PersonalInformationState[];
    @Input()
    set teachers(items: PersonalInformationState[]) { this._teachers = items }
    get teachers(): PersonalInformationState[] { return this._teachers }
    // 予約検索条件を親コンポーネントに送るイベントエミッタ
    @Output() searchEvent: EventEmitter<{ [key: string]: string | number | Date }> = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() { this.createForm() }

    private createForm(): void {
        this.searchForm = this.fb.group({
            id: null,
            name: '',
            mail_address: '',
            skype_name: '',
            reserved_date: '',
            teacherId: null
        });
    }

    public onSubmit(form: FormGroup): void { this.searchEvent.emit(form.value) }

}
