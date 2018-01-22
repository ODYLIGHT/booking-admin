import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { StudentInformationState } from '../../store/types';
import { InformationTableService } from './information-table.service';

@Component({
    selector: 'app-information-table',
    templateUrl: './information-table.component.html',
    styleUrls: ['./information-table.component.scss'],
    providers: [InformationTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationTableComponent implements OnInit {
    private _customers: StudentInformationState[];
    @Input()
    set customers(items: StudentInformationState[]) { this._customers = items }
    get customers(): StudentInformationState[] { return this._customers }

    @Output() linkEvent = new EventEmitter();
    public currentPage = 1;
    public itemPerPage = 10;

    constructor(private service: InformationTableService) { }

    ngOnInit() { }

    public sliceItems(items: StudentInformationState[]): StudentInformationState[] {
        return items.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage);
    }

    public getCountry(timeZone: string) {
        return this.service.getCountryItem(timeZone);
    }

}
