import { Injectable } from '@angular/core';
import { Store } from '../store/abstract.store';
import { StudentInformationState } from '../store/types';

@Injectable()
export class StudentInformationStore extends Store<StudentInformationState[]> {

    constructor() { super(<StudentInformationState[]>[]) }
    private _changeState(items: StudentInformationState[]) {
        return (current: Readonly<StudentInformationState[]>): Partial<StudentInformationState[]> => items;
    }
    public changeState(items: StudentInformationState[]): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<StudentInformationState[]> { return this.current() }

}
