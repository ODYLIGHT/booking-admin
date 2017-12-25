import { Component, OnInit, OnChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TeacherState } from '../../../store/types';
import { TeacherFormsService } from './teacher-forms.service';
import { TeacherFormsStore } from './teacher-forms.store';

interface OptionsState {
    title: string;
    value: string | number;
}

const initialFormState: TeacherState = {
    id: null,
    name: '',
    name_jp: '',
    state: 0,
    time_zone: '',
    customers_language: 0,
    priority_number: null,
    skype_name: '',
    email: '',
    picture: '',
    user_id: '',
    password: '',
    authority: null,
    details_teaches: '',
    details_other_language: '',
    details_education: '',
    details_speciality: '',
    details_career: '',
    details_comment: '',
    details_testimonial: '',
    details_jp_teaches: '',
    details_jp_other_language: '',
    details_jp_education: '',
    details_jp_speciality: '',
    details_jp_career: '',
    details_jp_comment: '',
    details_jp_testimonial: ''
}

@Component({
    templateUrl: './teacher-forms.component.html',
    styleUrls: ['./teacher-forms.component.scss'],
    providers: [TeacherFormsService, TeacherFormsStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherFormsComponent implements OnInit, AfterViewInit {
    public pageHeadTitle: string;
    public btnText: string;
    public timeZones: string[];
    public profileForm: FormGroup;
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
        private fb: FormBuilder,
        private service: TeacherFormsService
    ) { this.createForm(initialFormState) }

    ngOnInit() {
        this.timeZones = this.service.getTimeZones;
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

    ngAfterViewInit() {
        // this.service.getItems$.subscribe(s => this.createForm(s));
    }

    /**
     * FormGroup初期化関数
     * @param initState フォーム初期化オブジェクト
     */
    private createForm(initState: TeacherState) { this.profileForm = this.fb.group(initState) }

    public get getSelectTeacherAsObservable$(): Observable<TeacherState> { return this.service.getItems$ }

    public onSubmit(form: FormGroup) {
        console.log(form.value);
    }

    // public onChange(event, obj) {
    //     const fileName = event.srcElement.files[0].name;
    //     obj._picture = fileName;
    //     console.log(fileName);
    //     console.log(obj);
    // }

    // public onSubmit(data: TeacherState, id: number): void {
    //     if (!!!id) {
    //         console.info(`insert teacher`);
    //         this.service.insertTeacher(data);
    //     } else {
    //         console.info(`update id: ${id}`);
    //         this.service.putTeacher(Object.assign({}, { id }, data));
    //     }
    // }

}
