import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SearchCustomerService } from './search-customer.service';
import { SearchCustomerStore } from './search-customer.store';
import { SearcherCustomerState } from '../../../store/types';

@Component({
    selector: 'app-search-customer',
    templateUrl: './search-customer.component.html',
    styleUrls: ['./search-customer.component.scss'],
    providers: [SearchCustomerService, SearchCustomerStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchCustomerComponent implements OnInit {
    public customerId: string;
    @Output() search = new EventEmitter();

    constructor(
        private service: SearchCustomerService,
        private store: SearchCustomerStore
    ) { }

    ngOnInit() {
    }

    public onSearch(): void {
        // 全角数字を半角に変換処理を挟む
        this.customerId = this.customerId.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
            String.fromCharCode(s.charCodeAt(0) - 65248));
        this.service.getCustomer(+this.customerId);
        this.search.emit(+this.customerId);
    }

    public get getNameAsObservable$(): Observable<string> { return this.service.getName$.map(s => s || '') }

}
