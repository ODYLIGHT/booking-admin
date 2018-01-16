import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';

import { PersonalInformationState, ScheduleState, BookingState } from '../../store/types';

export interface CheckScheduleState {
    teacher: PersonalInformationState;
    dateAsUTC: string;
    schedules: ScheduleState;
    reservations: BookingState;
}

@Injectable()
export class TeacherStore extends Store<PersonalInformationState[]> {
    constructor() { super(<PersonalInformationState[]>[]) }
    private _changeState(items: PersonalInformationState[]) {
        return (current: Readonly<PersonalInformationState[]>): Partial<PersonalInformationState[]> => items;
    }
    public changeState(items: PersonalInformationState[]): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<PersonalInformationState[]> { return this.current() }
}

@Injectable()
export class CheckTeacherScheduleStore extends Store<CheckScheduleState> {

    constructor() { super(<CheckScheduleState>null) }
    private _changeState(items: CheckScheduleState) {
        return (current: Readonly<CheckScheduleState>): Partial<CheckScheduleState> => items;
    }
    public changeState(items: CheckScheduleState): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<CheckScheduleState> { return this.current() }

}
