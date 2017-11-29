import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { CheckTeacherScheduleState } from '../../store/types';

export interface TeachersNameState {
    id: number;
    name: string;
}

export class CheckTeacherScheduleStore extends Store<CheckTeacherScheduleState> {
    constructor() { super(<CheckTeacherScheduleState>null) }

    private _changeState(items: CheckTeacherScheduleState) {
        return (c: Readonly<CheckTeacherScheduleState>): Partial<CheckTeacherScheduleState> => items;
    }

    public changeState(items: CheckTeacherScheduleState): void { this.dispatch(this._changeState(items)) }
}
