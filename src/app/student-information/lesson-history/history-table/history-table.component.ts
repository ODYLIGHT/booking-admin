import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ReservationState, ListState, LessonHistoryState } from '../../../store/types';
import { ExtendsMomentService } from '../extends.moment.service';

@Component({
    selector: 'app-history-table',
    templateUrl: './history-table.component.html',
    styleUrls: ['./history-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryTableComponent implements OnInit {
    private _reservations: ReservationState[];
    @Input()
    set reservations(item) { this._reservations = item }
    get reservations() { return this._reservations }

    private _historys: LessonHistoryState[];
    @Input()
    set historys(item: LessonHistoryState[]) { this._historys = item }
    get historys() { return this._historys }

    private _timeZone: string;
    @Input()
    set timeZone(str) { this._timeZone = str }
    get timeZone() { return this._timeZone }

    private _pulldowns: ListState;
    @Input()
    set pulldowns(items) { this._pulldowns = items }
    get pulldowns() { return this._pulldowns }

    public currentPage = 1;
    public itemPerPage = 5;
    public innerFormGroup = {};
    public historyForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private exMomentService: ExtendsMomentService
    ) { }

    ngOnInit() {
        this.reservations.forEach(obj => {
            this.innerFormGroup[obj.id] = this.fb.group(this.historys.find(o => o.reserved_id === obj.id));
        });
        this.historyForm = this.fb.group(this.innerFormGroup);
        console.log(this.historyForm);
    }

    public getTz() {
        return this.exMomentService.getFormatedTz(this.timeZone);
    }

    public endTime(date: Date) { return this.exMomentService.addTime(date) }

    public onClick(item) {
        console.log(item);
    }

    public selectItems(allData: ReservationState[]): ReservationState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

}
