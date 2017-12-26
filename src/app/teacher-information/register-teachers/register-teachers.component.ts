import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { RegisterTeachersService } from './register-teachers.service';
import { RegisterTeachersStore } from './register-teachers.store';
import { TeacherState } from '../../store/types';

@Component({
  templateUrl: './register-teachers.component.html',
  styleUrls: ['./register-teachers.component.scss'],
  providers: [RegisterTeachersService, RegisterTeachersStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterTeachersComponent implements OnInit {
    private window: Window;
    public currentPage = 1;
    public itemPerPage = 10;

    constructor(
        private service: RegisterTeachersService,
        private router: Router
    ) { }

    ngOnInit() { this.service.getInit() }

    public get getTeachersAsObservable$(): Observable<TeacherState[]> { return this.service.getItems$.map(s => s) }

    public selectItems(allData: TeacherState[]): TeacherState[] {
        return allData.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage)
    }

    /**
     * 講師の新規登録ページへ移行させる
     */
    public onAddTeacher(): void { this.router.navigate(['/administrator/register-teachers/insert']) }

    /**
     * 特定の講師情報変更のため、IDをURLパラメータに追加してページを移行させる
     * 移行先のページは新規追加と同じ
     * @param id 講師のID
     */
    public onModify(id: number): void { this.router.navigate(['/administrator/register-teachers/edit', id]) }

    public onDelete(id: number): void {
        const confirmMessage = 'Are you sure you want to delete All information of this teacher?';
        if (window.confirm(confirmMessage)) this.service.deleteTeacher(id);
        else window.alert(`confirm false, not delete.`);
    }

}
