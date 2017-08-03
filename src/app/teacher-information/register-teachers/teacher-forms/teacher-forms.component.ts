import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TeacherState } from '../../../store/types';
import { TeacherFormsService } from './teacher-forms.service';
import { TeacherFormsStore } from './teacher-forms.store';

interface OptionsState {
    title: string;
    value: string | number;
}

@Component({
    selector: 'app-teacher-forms',
    templateUrl: './teacher-forms.component.html',
    styleUrls: ['./teacher-forms.component.scss'],
    providers: [TeacherFormsService, TeacherFormsStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherFormsComponent implements OnInit {
    public pageHeadTitle: string;
    public btnText: string;
    // customers languageのオプション配列
    public languages: OptionsState[] = [
        { title: 'ALL', value: 0 },
        { title: 'English only', value: 1 }
    ];
    // authorityのオブジェクト配列
    public authoritys: OptionsState[] = [
        { title: 'FT-Teacher', value: 0 },
        { title: 'PT-Teacher', value: 1 },
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: TeacherFormsService
    ) { }

    ngOnInit() {
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                const selectId = params.get('id') ? +params.get('id') : null;
                this.pageHeadTitle = (selectId) ? 'Edit Teacher Profile' : 'Add New Teacher';
                this.btnText       = (selectId) ? 'Update' : 'Register';
                if (!!selectId) {
                    this.service.getInitWithId(selectId);
                }
            });
    }

    public get getSelectTeacherAsObservable$(): Observable<TeacherState> { return this.service.getItems$.map(s => s) }

    public onChange(event, obj) {
        const fileName = event.srcElement.files[0].name;
        obj._picture = fileName;
        console.log(fileName);
        console.log(obj);
    }

    public onSubmit(data: TeacherState, id: number): void {
        if (!!!id) {
            console.info(`insert teacher`);
            this.service.insertTeacher(data);
        } else {
            console.info(`update id: ${id}`);
            this.service.putTeacher(Object.assign({}, { id }, data));
        }
    }

}
