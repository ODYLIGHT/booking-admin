import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { OverviewService } from './overview.service';
import { StudentForm, OtherLang, PullDownMenusState, OverviewStore } from './overview.store';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    providers: [OverviewService, OverviewStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
    /**
     * サンプルデータは`student.json`になります
     * ※`customers.json`ではありません！
     */
    public pageHeaderTitle: string;
    public itemOfYear: number[] = [];
    public itemOfMonth: { label: string, value: number }[];
    public pullDownMenus: BehaviorSubject<PullDownMenusState> = new BehaviorSubject(null);
    public formCtrls: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private service: OverviewService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.createWeeksItems();
        this.createForm();
        this.service.getPullDownMenusApi.subscribe(s => this.pullDownMenus.next(s));
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                const isAddNew = params.get('id') !== 'new' ? false : true;
                this.pageHeaderTitle = isAddNew ? 'Add New Student' : 'Overview of Student Information';
                if (isAddNew) {
                    // 新規登録だった場合のフォーム初期化処理
                } else {
                    // 修正登録だった場合のフォーム初期化処理
                }
            });
    }

    private createForm(): void {
        this.formCtrls = this.fb.group({
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
            howFined: [ '', Validators.required ],
            otherLanguage1: this.fb.group( new OtherLang() ),
            otherLanguage2: this.fb.group( new OtherLang() ),
            programCode: '',
            remark: '',
            clientCode: ''
        })
    }

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
        console.log(items.value);
    }

}
