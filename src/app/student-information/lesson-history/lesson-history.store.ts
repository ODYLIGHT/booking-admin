import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';

import { CustomerState, ListState, ReservationState } from '../../store/types';

export interface HistortyState {
    customer: CustomerState;
    pulldown_menus: ListState;
    historys: any;
    reservatons: ReservationState;
}

@Injectable()
export class LessonHistoryStore extends Store<HistortyState> {
    constructor() { super(<HistortyState>null) }
    private _changeState(items: Partial<HistortyState>) {
        return (c: Readonly<HistortyState>): Partial<HistortyState> => items;
    }
    public changeState(items: Partial<HistortyState>): void { this.dispatch(this._changeState(items)) }

    public get getCurrent(): Readonly<HistortyState> { return this.current() }
}
