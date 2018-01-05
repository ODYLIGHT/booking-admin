import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { OverviewService } from './overview.service';
import { StudentForm, OtherLang1, OtherLang2, PullDownMenusState, OverviewStore, CustomerState } from './overview.store';
// import { CustomerState } from '../../store/types';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    providers: [OverviewService, OverviewStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
    public pageHeaderTitle: string;
    public itemOfYear: number[] = [];
    public itemOfMonth: { label: string, value: number }[];
    public pullDownMenus: BehaviorSubject<PullDownMenusState> = new BehaviorSubject(null);
    public formCtrls: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: OverviewService,
        private fb: FormBuilder
    ) { this.createForm() }

    ngOnInit() {
        this.createWeeksItems();
        this.service.getPullDownMenusApi.subscribe(s => this.pullDownMenus.next(s));
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                const isAddNew = params.get('id') !== 'new' ? false : true;
                this.pageHeaderTitle = isAddNew ? 'Add New Student' : 'Overview of Student Information';
                if (!!!isAddNew) {
                    // 修正登録だった場合のフォーム初期化処理
                    const id = +params.get('id');
                    this.service.getCustomer(id);
                    this.service.customer$.subscribe(s => this.setForm(s[0]));
                }
            });
    }

    private createForm(): void {
        this.formCtrls = this.fb.group({
            id: [''],
            customerName: [ '', Validators.required ],
            nickName: '',
            jpName: [ '', Validators.required ],
            gender: [ '', Validators.required ],
            birth: this.fb.group({
                day: [ '', Validators.required ],
                month: [ '', Validators.required ],
                year: [ '', Validators.required ]
            }),
            skypeName: [ '', Validators.required ],
            mailAddress: [ '', Validators.required ],
            password: [ '', Validators.required ],
            frenchLevel: [ '', Validators.required ],
            learningExperience: '',
            purpose: [ '', Validators.required ],
            motherTongue: [ '', Validators.required ],
            howFinded: [ '', Validators.required ],
            otherLanguage1: this.fb.group( new OtherLang1() ),
            otherLanguage2: this.fb.group( new OtherLang2() ),
            programCode: '',
            remark: '',
            clientCode: ''
        });
    }

    private setForm(obj: CustomerState): void {
        if (!!!obj) return;
        this.formCtrls.reset({
            id: obj.id || '',
            customerName: obj.customerName,
            nickName: obj.nickName,
            jpName: obj.jpName,
            gender: obj.gender,
            birth: {
                day: new Date(obj.birth).getDate(),
                month: new Date(obj.birth).getMonth(),
                year: new Date(obj.birth).getFullYear()
            } || { day: null, month: null, year: null },
            skypeName: obj.skypeName,
            mailAddress: obj.mailAddress,
            password: obj.password,
            frenchLevel: obj.frenchLevel,
            learningExperience: obj.learningExperience,
            purpose: obj.purpose,
            motherTongue: obj.motherTongue,
            howFinded: obj.howFinded,
            otherLanguage1: { language: obj.otherLanguage1, lang1_level: `${obj.otherLanguage1_level}` } || new OtherLang1(),
            otherLanguage2: { language: obj.otherLanguage2, lang2_level: `${obj.otherLanguage2_level}` } || new OtherLang2(),
            programCode: obj.programCode,
            remark: obj.remark,
            clientCode: obj.clientCode
        });
    }

    public get getId(): Observable<number> { return this.service.customer$.map(s => s[0] ? s[0].id : null) }

    private createWeeksItems(): void {
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < 50; i++) this.itemOfYear.push(currentYear - i);
        this.itemOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            .map((v, i) => ({ label: v, value: i }));
    }

    public get returnMatchOfDays(): number[] {
        let loopIndex: number;
        const _y = +this.formCtrls.value.year
        const _m = +this.formCtrls.value.month + 1;

        if ((_m < 8 && _m % 2 !== 0) || (_m >= 8 && _m % 2 === 0)) loopIndex = 31;
        else if (_m === 2) {
            if (!(_y % 4) && (_y % 100) || !(_y % 400)) loopIndex = 29;
            else loopIndex = 28;
        } else loopIndex = 30;

        const value = [];
        for (let i = 1; i <= loopIndex; i++) value.push(i);
        return value;

    }

    public get isDisabled() {
        for (const key in this.formCtrls.controls) {
            if (this.formCtrls.controls.hasOwnProperty(key)) {
                const _errors = this.formCtrls.controls[key].hasError('required');
                if (_errors && !!!this.formCtrls.controls[key].value) return true;
            }
        }
    }

    public onSubmit(items) {
        // フォームモデルをデータモデルに戻しています
        // もっといいやり方ないでしょうかね・・・
        const params = Object.assign({}, items.value);
        params.birth = [
            items.value.birth.year,
            `0${+items.value.birth.month + 1}`.slice(-2),
            `0${items.value.birth.day}`.slice(-2)
        ].join('/'); // YYYY/MM/dd
        params.otherLanguage1 = items.value.otherLanguage1.language;
        params.otherLanguage1_level = items.value.otherLanguage1.lang1_level;
        params.otherLanguage2 = items.value.otherLanguage2.language;
        params.otherLanguage2_level = items.value.otherLanguage2.lang2_level;
        console.log(params);

        let api;
        if (!!!params.id) api = this.service.insertCustomer(params);
        else api = this.service.updateCustomer(params);
        api.subscribe(state => {
            window.alert(`Request API is ${state}`);
            // this.router.navigate(['/administrator/student-information']);
        });
    }

    public onDelete(): void {
        if (window.confirm(`Delete ${this.formCtrls.value.customerName}?`)) {
            console.log(`deleting...`);
        } else {
            console.log(`canceled.`);
        }
    }

}
