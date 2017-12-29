import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { SearchedStudentInformationState } from '../../store/types';

export class StudentInformationStore extends Store<SearchedStudentInformationState[]> {
    constructor() { super(<SearchedStudentInformationState[]>[]) }

    private _changeState(items: SearchedStudentInformationState[]) {
        return (c: Readonly<SearchedStudentInformationState[]>): Partial<SearchedStudentInformationState[]> => items;
    }

    public changeState(items: SearchedStudentInformationState[]): void { this.dispatch(this._changeState(items)) }
}
