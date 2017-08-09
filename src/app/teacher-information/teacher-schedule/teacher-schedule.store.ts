import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { ScheduleState } from '../../store/types';

@Injectable()
export class TeacherScheduleStore extends Store<ScheduleState[]> {
    constructor() { super(<ScheduleState[]>{}) }
    private _changeData(items: ScheduleState[]) {
        return (c: Readonly<ScheduleState[]>): Partial<ScheduleState[]> => items;
    }
    public changeState(items: ScheduleState[]): void { this.dispatch(this._changeData(items)) }
}
