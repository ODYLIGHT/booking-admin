import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { ScheduleState } from '../../store/types';

export interface OptionItemsState {
    id: number;
    name: string;
    time_zone: string;
}

@Injectable()
export class OperationsStore extends Store<OptionItemsState[]> {
    constructor() { super(<OptionItemsState[]>[]) }
    private _changeState(items: OptionItemsState[]) { return (c: Readonly<OptionItemsState[]>): Partial<OptionItemsState[]> => items }
    public changeState(items: OptionItemsState[]): void { this.dispatch(this._changeState(items)) }
}

@Injectable()
export class TeacherScheduleStore extends Store<ScheduleState[]> {
    constructor() { super(<ScheduleState[]>{}) }
    private _changeState(items: ScheduleState[]) {
        return (c: Readonly<ScheduleState[]>): Partial<ScheduleState[]> => items;
    }
    public changeState(items: ScheduleState[]): void { this.dispatch(this._changeState(items)) }
}
