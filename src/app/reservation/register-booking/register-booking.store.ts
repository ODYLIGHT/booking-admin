import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { RegisterBookingTeachersState } from '../../store/types';

@Injectable()
export class RegisterBookingStore extends Store<RegisterBookingTeachersState[]> {
    constructor() { super(<RegisterBookingTeachersState[]>{}) }
    private _changeData(items: RegisterBookingTeachersState[]) {
        return (c: Readonly<RegisterBookingTeachersState[]>): Partial<RegisterBookingTeachersState[]> => items;
    }
    public changeState(items: RegisterBookingTeachersState[]): void { this.dispatch(this._changeData(items)) }
}
