import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { CustomerState, ListState } from '../../../store/types';
import { CustomerInfoService } from './customer-info.service';

@Component({
    selector: 'app-customer-info',
    templateUrl: './customer-info.component.html',
    styleUrls: ['./customer-info.component.scss'],
    providers: [CustomerInfoService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerInfoComponent implements OnInit {
    private _customer: CustomerState;
    @Input()
    set customer(item) { this._customer = item }
    get customer() { return this._customer }
    private _pulldowns: ListState;
    @Input()
    set pulldowns(items) { this._pulldowns = items }
    get pulldowns() { return this._pulldowns }

    @Output() changeEvent = new EventEmitter();

    constructor(private service: CustomerInfoService) { }

    ngOnInit() {
    }

    public getCountry(timeZone: string) {
        return this.service.getCountryItem(timeZone);
    }

    onChange(e) {
        this.changeEvent.emit(e.value);
    }

}
