import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { SearchBookingState } from '../../store/types';

export class SearchBookingStore extends Store<SearchBookingState[]> {
    constructor() { super(<SearchBookingState[]>{}) }

    private _changeState(items: SearchBookingState[]) {
        return (c: Readonly<SearchBookingState[]>): Partial<SearchBookingState[]> => items;
    }

    public changeState(items: SearchBookingState[]): void { this.dispatch(this._changeState(items)) }
}
