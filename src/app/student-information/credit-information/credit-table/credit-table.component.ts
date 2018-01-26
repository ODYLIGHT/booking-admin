import { Component, OnInit, Input, OnChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';

import { CreditState } from '../../../store/types';

@Component({
    selector: 'app-credit-table',
    templateUrl: './credit-table.component.html',
    styleUrls: ['./credit-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditTableComponent implements OnInit, OnChanges {
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
    public combinedCredits: CreditState[] = []; // 重複を取り除いたクレジットデータ配列

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: { [prop: string]: SimpleChange }) {
        for (const key in changes) {
            if (changes.hasOwnProperty(key)) {
                if (changes[key].firstChange) return;
                else if (key === 'credits') this.combinedCredits = this.combineItems(changes[key].currentValue);
            }
        }
    }

    /**
     * 受け取ったクレジットデータで、重複したレコード（一度に複数のクレジット登録をしたデータ）を取り除く
     */
    public combineItems(data: CreditState[]): CreditState[] {
        // 受け取ったデータ配列のオブジェクトの値をすべて文字列に変換
        // new Setで重複を取り除き、Array.fromで配列に戻してからmap関数で再度オブジェクトにパース
        return Array.from(new Set(data.map(o => JSON.stringify(o)))).map(s => JSON.parse(s));
    }

    public selectItems(allData: CreditState[]): CreditState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

    public get getTotal(): number {
        let n = 0;
        this.credits.forEach(val => !!!val.adjustment ? n++ : n--);
        return n;
    }

}
