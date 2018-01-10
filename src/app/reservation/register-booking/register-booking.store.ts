import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { CustomerReservationState } from '../../store/types';

export interface SearchCustomerState {
    id: number;
    name: string;
    time_zone: string;
}

export interface TeacherForOptionState {
    id: number;
    name: string;
    time_zone: string;
}

export const initOptionsState: SearchCustomerState | TeacherForOptionState = {
    id: null,
    name: '',
    time_zone: ''
};

export interface OperationsState {
    customer: SearchCustomerState;
    teacher: TeacherForOptionState;
}

export const initOperation: OperationsState = {
    customer: initOptionsState,
    teacher: initOptionsState
};

export interface BookingState {
    customerId: number;
    teacherId: number;
    reservations: CustomerReservationState;
    canNotReserve: string[];
}

export const initBookingState: BookingState = {
    customerId: null,
    teacherId: null,
    reservations: { insert: [], current: [], delete: [] },
    canNotReserve: []
}

// 全講師情報ストア
@Injectable()
export class TeacherStore extends Store<TeacherForOptionState[]> {
    constructor() { super(<TeacherForOptionState[]>[]) }
    private _changeState(items: TeacherForOptionState[]) {
        return (current: Readonly<TeacherForOptionState[]>): Partial<TeacherForOptionState[]> => items;
    }
    public changeState(items: TeacherForOptionState[]): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<TeacherForOptionState[]> { return this.current() }
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
