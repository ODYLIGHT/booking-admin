import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '../../store/abstract.store';
import { TeacherState } from '../../store/types';

@Injectable()
export class RegisterTeachersStore extends Store<TeacherState[]> {
    constructor() { super(<TeacherState[]>[]) }

    private _changeState(items: TeacherState[]) { return (c: Readonly<TeacherState[]>): Partial<TeacherState[]> => items }
    public changeState(items: TeacherState[]): void { this.dispatch(this._changeState(items)) }

    public get getCurrent(): Readonly<TeacherState[]> { return this.current() }
}
