import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { TimeState, PersonalInformationState } from '../../store/types';

export interface OperationsState {
    customer: PersonalInformationState;
    teacher: PersonalInformationState;
}

export interface BookingState {
    customerId: number;
    teacherId: number;
    reservations: TimeState;
    canNotReserve: string[];
}

export const initOptionsState: PersonalInformationState = {
    id: null,
    name: '',
    time_zone: ''
};

export const initOperation: OperationsState = {
    customer: initOptionsState,
    teacher: initOptionsState
};

export const initBookingState: BookingState = {
    customerId: null,
    teacherId: null,
    reservations: { insert: [], current: [], delete: [] },
    canNotReserve: []
}

// 全講師情報ストア
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
export class OperationsStore extends Store<OperationsState> {
    constructor() { super(<OperationsState>initOperation) }
    private _changeState(items: OperationsState) {
        return (current: Readonly<OperationsState>): Partial<OperationsState> => items;
    }
    public changeState(items: OperationsState): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<OperationsState> { return this.current() }
}

@Injectable()
export class BookingStore extends Store<BookingState> {
    constructor() { super(<BookingState>undefined) }
    private _changeState(items: BookingState) {
        return (current: Readonly<BookingState>): Partial<BookingState> => items;
    }
    public changeState(items: BookingState): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<BookingState> { return this.current() }
}
