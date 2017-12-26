import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { ScheduleState } from '../../store/types';

export interface OptionItemsState {
    id: number;
    name: string;
    time_zone: string;
}

export interface TeacherSchedulesState {
    teacher: OptionItemsState;
    tHeadColumns: Date[] | string[];
    tLeftColumns: string[];
    schedules: { insert: string[], update: string[] };
}

export const initOptionsState: OptionItemsState = {
    id: null,
    name: '',
    time_zone: ''
};

export const initScheduleState: TeacherSchedulesState = {
    teacher: initOptionsState,
    tHeadColumns: [],
    tLeftColumns: [],
    schedules: { insert: [], update: [] }
};

@Injectable()
export class OperationsStore extends Store<OptionItemsState[]> {
    constructor() { super(<OptionItemsState[]>[]) }
    private _changeState(items: OptionItemsState[]) { return (c: Readonly<OptionItemsState[]>): Partial<OptionItemsState[]> => items }
    public changeState(items: OptionItemsState[]): void { this.dispatch(this._changeState(items)) }
}

// @Injectable()
// export class TeacherScheduleStore extends Store<ScheduleState[]> {
//     constructor() { super(<ScheduleState[]>{}) }
//     private _changeState(items: ScheduleState[]) {
//         return (c: Readonly<ScheduleState[]>): Partial<ScheduleState[]> => items;
//     }
//     public changeState(items: ScheduleState[]): void { this.dispatch(this._changeState(items)) }
// }

@Injectable()
export class TeacherScheduleStore extends Store<TeacherSchedulesState> {
    constructor() { super(initScheduleState) }
    private _changeState(items: Partial<TeacherSchedulesState>) {
        return (c: Readonly<TeacherSchedulesState>): Partial<TeacherSchedulesState> => items;
    }
    public changeState(items: Partial<TeacherSchedulesState>): void { this.dispatch(this._changeState(items)) }
}
