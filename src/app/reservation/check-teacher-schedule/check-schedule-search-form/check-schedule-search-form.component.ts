import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TeachersNameState } from '../check-teacher-schedule.store';
import { NgForm, FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-check-schedule-search-form',
    templateUrl: './check-schedule-search-form.component.html',
    styleUrls: ['./check-schedule-search-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckScheduleSearchFormComponent implements OnInit {
    @Input() teachersName: TeachersNameState[];
    @Output() searchEvent = new EventEmitter();
    private teachersNameCtrl: FormControl;
    private weekYearCtrl: FormControl;
    private weekMonthCtrl: FormControl;
    private weekDayCtrl: FormControl;
    public searchCtrls: FormGroup;
    public weekYears: number[];
    public weekMonths: { val: number, title: string }[];
    public weekDays: number[] = [];
    private today = new Date();

    constructor() { }

    ngOnInit() {
        this.formInit();
        this.createWeeksItems();
        this.returnMatchOfDays()
        this.searchCtrls.valueChanges.subscribe(v => this.returnMatchOfDays());
    }

    private formInit(): void {
        this.teachersNameCtrl = new FormControl('');
        this.weekYearCtrl = new FormControl(`${this.today.getFullYear()}`);
        this.weekMonthCtrl = new FormControl(`${this.today.getMonth()}`);
        this.weekDayCtrl = new FormControl(`${this.today.getDate()}`);
        this.searchCtrls = new FormGroup({
            teacherId: this.teachersNameCtrl,
            year: this.weekYearCtrl,
            month: this.weekMonthCtrl,
            day: this.weekDayCtrl
        });
    }

    /**
     * 日付選択の各データを作成する
     * 年はとりあえず５年分
     */
    private createWeeksItems(): void {
        const currentYear = this.today.getFullYear();
        this.weekYears = [4, 3, 2, 1, 0].map(v => currentYear - v);
        this.weekMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            .map((s, i, a) => {
                return { val: i, title: s }
            });
    }

    /**
     * 選んだ月に合致する日付を返す
     */
    public returnMatchOfDays(): void {
        this.weekDays = [];
        const _year = +this.searchCtrls.controls['year'].value;
        const _month = +this.searchCtrls.controls['month'].value + 1;
        let loopIdx: number;
        if ((_month < 8 && _month % 2 !== 0) || (_month >= 8 && _month % 2 === 0)) loopIdx = 31
        else if (_month === 2) {
            if (!(_year % 4) && (_year % 100) || !(_year % 400)) loopIdx = 29;
            else loopIdx = 28;
        } else {
            loopIdx = 30;
        }

        for (let i = 1; i <= loopIdx; i++) {
            this.weekDays.push(i);
        }
    }

    public onSearch() {
        this.searchEvent.next(this.searchCtrls.value);
    }

}
