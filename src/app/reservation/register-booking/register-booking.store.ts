import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';

export interface SearchCustomerState {
    id: number;
    name: string;
}

/**
 * register-bookingのStore群
 *
 * 検索する顧客情報・予約対象の講師情報・予約情報の３つになる予定
 */

@Injectable()
export class SearchCustomerStore extends Store<SearchCustomerState> {
    constructor() { super(<SearchCustomerState>{ id: null, name: '' }) }
    private _changeState(items: SearchCustomerState) {
        return (current: Readonly<SearchCustomerState>): Partial<SearchCustomerState> => items;
    }
    public changeState(items: SearchCustomerState): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<SearchCustomerState> { return this.current() }
}

@Injectable()
export class RegisterBookingStore {
}
