import { Injectable } from '@angular/core';
import { Store } from '../store/abstract.store';
import { MenuState } from '../store/types';

@Injectable()
export class HeaderStore extends Store<MenuState[]> {
    constructor() { super(<MenuState[]>{}) }
    private _changeData(items: MenuState[]) { return (c: Readonly<MenuState[]>): Partial<MenuState[]> => items }
    public initStore(items: MenuState[]): void { this.dispatch(this._changeData(items)) }
}
