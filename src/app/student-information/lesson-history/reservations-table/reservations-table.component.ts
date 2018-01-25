import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { ReservationState } from '../../../store/types';
import { ExtendsMomentService } from '../extends.moment.service';

@Component({
    selector: 'app-reservations-table',
    templateUrl: './reservations-table.component.html',
    styleUrls: ['./reservations-table.component.scss'],
    providers: [ExtendsMomentService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsTableComponent implements OnInit {
    private _reservations: ReservationState[];
    @Input()
    set reservations(item) { this._reservations = item }
    get reservations() { return this._reservations }
    private _timeZone: string;
    @Input()
    set timeZone(str) { this._timeZone = str }
    get timeZone() { return this._timeZone }

    public currentPage = 1;
    public itemPerPage = 5;

    constructor(private exMomentService: ExtendsMomentService) { }

    ngOnInit() { }

    public getTz() {
        return this.exMomentService.getFormatedTz(this.timeZone);
    }

    public selectItems(allData: ReservationState[]): ReservationState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

    public endTime(date: Date) { return this.exMomentService.addTime(date) }

}
