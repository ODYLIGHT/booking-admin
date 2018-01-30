import { Injectable } from '@angular/core';
import { Store } from '../../store/abstract.store';
import { CreditState } from '../../store/types';

@Injectable()
export class CreditInformationStore extends Store<CreditState[]> {

    constructor() { super(<CreditState[]>[]) }
    private _changeState(items: CreditState[]) {
        return (current: Readonly<CreditState[]>): Partial<CreditState[]> => items;
    }
    public changeState(items: CreditState[]): void { this.dispatch(this._changeState(items)) }
    public get getCurrent(): Readonly<CreditState[]> { return this.current() }

}
