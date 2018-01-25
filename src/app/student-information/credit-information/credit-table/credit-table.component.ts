import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { CreditState } from '../../../store/types';

@Component({
    selector: 'app-credit-table',
    templateUrl: './credit-table.component.html',
    styleUrls: ['./credit-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditTableComponent implements OnInit {
    private _credits: CreditState[];
    @Input()
    set credits(items) { this._credits = items }
    get credits() { return this._credits }

    private _timeZone: string;
    @Input()
    set timeZone(str) { this._timeZone = str }
    get timeZone() { return this._timeZone }

    public currentPage = 1;
    public itemPerPage = 10;

    constructor() { }

    ngOnInit() {
    }

    public selectItems(allData: CreditState[]): CreditState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

}
