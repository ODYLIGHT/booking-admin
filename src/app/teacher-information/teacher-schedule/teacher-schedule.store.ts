import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { TimeState } from '../../store/types';

export interface OptionItemsState {
    id: number;
    name: string;
    time_zone: string;
}

export const initOptionsState: OptionItemsState = {
    id: null,
    name: '',
    time_zone: ''
};

export const initScheduleState: TimeState = {
    current: [],
    insert: [],
    delete: []
};

@Injectable()
export class OperationsStore extends Store<OptionItemsState[]> {
    constructor() { super(<OptionItemsState[]>[]) }
    private _changeState(items: OptionItemsState[]) { return (c: Readonly<OptionItemsState[]>): Partial<OptionItemsState[]> => items }
    public changeState(items: OptionItemsState[]): void { this.dispatch(this._changeState(items)) }
}

@Injectable()
export class TeacherScheduleStore extends Store<TimeState> {
    constructor() { super(<TimeState>initScheduleState) }
    private _changeState(items: Partial<TimeState>) {
        return (c: Readonly<TimeState>): Partial<TimeState> => items;
    }
    public changeState(items: Partial<TimeState>): void { this.dispatch(this._changeState(items)) }

    public get getCurrent(): Readonly<TimeState> { return this.current() }
}
