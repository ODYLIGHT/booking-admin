import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { RegisterTeachersStore } from './register-teachers.store';
import { TeacherState } from '../../store/types';

@Injectable()
export class RegisterTeachersService {
    readonly apiInitUrl = 'api/teacher-information/register-teachers';
    readonly apiDeleteUrl = 'api/teacher-information/register-teachers/delete/';
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient,
        private store: RegisterTeachersStore,
        private snackBar: MatSnackBar
    ) { }

    /**
     * 画面初期化用リクエスト
     */
    public getInit(): void {
        this.http.get(this.apiInitUrl, { headers: this.headers }).subscribe((res: TeacherState[]) => this.store.changeState(res));
    }

    /**
     * 全講師分の情報配列をObservableで返す
     */
    public get getItems$(): Observable<TeacherState[]> { return this.store.data$.pipe(map(s => Object.values(s))) }

    /**
     * 引数`id`に不一致の講師配列を作成し、Storeを更新する
     * @param id 選択した講師のID
     */
    public deleteTeacher(id: number): void {
        this.http.delete(`${this.apiDeleteUrl}${id}`, { headers: this.headers })
            .subscribe(
                res => {
                    if (!!!environment.production) console.log(res);
                    this.snackBar.open('Successfully deleted', null, { duration: 2000 });
                },
                (err: HttpErrorResponse) => {
                    const errorMessage =
                        'There was a problem on the server side.\n'
                        + 'Please give the administrator the following message / code.\n'
                        + `[message]: ${err.statusText}\n`
                        + `[code]: ${err.status}\n`
                        ;
                    window.alert(errorMessage);
                },
                () => {
                    // httpリクエストのsubscribeが無事完了したときのcomplete callbackでStoreの更新を呼び出す
                    const current: TeacherState[] = Object.values(this.store.getCurrent);
                    const filteredState = current.filter(teacher => teacher.id !== id);
                    this.store.changeState(filteredState);
                }
            );
    }

}
