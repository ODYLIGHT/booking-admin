import { Injectable } from '@angular/core';
import { Store } from '../../../store/abstract.store';
import { SearcherCustomerState } from '../../../store/types';

@Injectable()
export class SearchCustomerStore extends Store<SearcherCustomerState> {
    constructor() { super(<SearcherCustomerState>{}) }
    private _changeData(items: SearcherCustomerState) {
        return (c: Readonly<SearcherCustomerState>): Partial<SearcherCustomerState> => items;
    }
    public changeState(items: SearcherCustomerState): void { this.dispatch(this._changeData(items)) }
}
