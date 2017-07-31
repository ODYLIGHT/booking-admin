'use strict';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

export type Action<T> = (current: Readonly<T>) => Partial<T>;

export class Store<T> {
    private _data: BehaviorSubject<Readonly<T>>;
    public data$: Observable<Readonly<T>>;

    constructor(initialData: T) {
        this._data = new BehaviorSubject(initialData as Readonly<T>);
        this.data$ = this._data.asObservable();
    }

    protected current(): Readonly<T> { return this._data.getValue(); }

    protected next(data: Readonly<T>): void { this._data.next(data) };

    /**
     * Update State.
     */
    protected update(current: Readonly<T>, diff: Partial<T>): Readonly<T> {
        return { ...current as object, ...diff as object } as Readonly<T>;
    }

    public dispatch(action: Action<T>): void {
        const current = this.current();
        const diff = action(current);
        const result = this.update(current, diff);
        this.next(result);
    }

}
