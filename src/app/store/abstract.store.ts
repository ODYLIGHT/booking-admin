'use strict';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export type Action<T> = (current: Readonly<T>) => Partial<T>;

export class Store<T> {
    private _data: BehaviorSubject<Readonly<T>>;
    public data$: Observable<Readonly<T>>;

    constructor(initialData: T) {
        this._data = new BehaviorSubject(initialData as Readonly<T>);
        this.data$ = this._data.asObservable();
    }

    /**
     * 現在のStateを返す
     */
    protected current(): Readonly<T> { return this._data.getValue(); }

    /**
     * 更新されたデータのストリームを流す
     * @param data 管理しているデータ
     */
    protected next(data: Readonly<T>): void { this._data.next(data) };

    /**
     * Update State.
     */
    protected update(diff: Partial<T>): Readonly<T> {
        // これだと`current`と結合されるため削除などしたデータも残ってしまう
        // return { ...current as object, ...diff as object } as Readonly<T>;
        return { ...diff as object } as Readonly<T>;
    }

    /**
     * 各コンポーネントのサービスから、データの更新を受け取り処理する
     * @param action データの型をReadonlyからPartialに変換したものを返す関数
     */
    public dispatch(action: Action<T>): void {
        const current = this.current();
        const diff = action(current);
        const result = this.update(diff);
        this.next(result);
    }

}
