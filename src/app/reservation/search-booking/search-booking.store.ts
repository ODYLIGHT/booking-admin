import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';

import { PersonalInformationState, BookingState } from '../../store/types';

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
export class SearchBookingStore extends Store<BookingState[]> {

    constructor() { super(<BookingState[]>[]) }
    private _changeState(items: BookingState[]) {
        return (current: Readonly<BookingState[]>): Partial<BookingState[]> => items;
    }
    public changeState(items: BookingState[]): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<BookingState[]> { return this.current() }

}
