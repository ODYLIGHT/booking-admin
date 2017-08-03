import { Injectable } from '@angular/core';
import { Store } from '../../../store/abstract.store';
import { TeacherState } from '../../../store/types';

@Injectable()
export class TeacherFormsStore extends Store<TeacherState> {
    constructor() { super(<TeacherState>{}) }
    private _changeData(items: TeacherState) {
        return (c: Readonly<TeacherState>): Partial<TeacherState> => items;
    }
    public changeState(items: TeacherState): void { this.dispatch(this._changeData(items)) }
}
