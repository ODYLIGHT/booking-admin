import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewComponent implements OnInit {
    public pageHeaderTitle: string;
    public itemOfYear: number[] = [];
    public itemOfMonth: { label: string, value: number }[];

    private customerNameCtrl: FormControl;
    private nickNameCtrl: FormControl;
    private jpNameCtrl: FormControl;
    private genderCtrl: FormControl;
    private birthYearCtrl: FormControl;
    private birthMonthCtrl: FormControl;
    private birthDayCtrl: FormControl;
    private skypeNameCtrl: FormControl;
    private mailAddressCtrl: FormControl;
    private passwordCtrl: FormControl;
    private frenchLevelCtrl: FormControl;
    private learningExprerienceCtrl: FormControl; // フランス語修学の経験
    private purposeCtrl: FormControl; // 学習の目的
    private motherTongueCtrl: FormControl; // 母国語
    private howFindedCtrl: FormControl;
    private otherLang1Ctrl: FormControl;
    private otherLang2Ctrl: FormControl;
    public formCtrls: FormGroup;

    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.createWeeksItems();
        this.route.paramMap
            .subscribe((params: ParamMap) => {
                const isAddNew = params.get('id') !== 'new' ? false : true;
                this.pageHeaderTitle = isAddNew ? 'Add New Student' : 'Overview of Student Information';
                this.formInit();
            });
    }

    private formInit(): void {
        this.customerNameCtrl = new FormControl('', [Validators.required]);
        this.nickNameCtrl = new FormControl('');
        this.jpNameCtrl = new FormControl('', [Validators.required]);
        this.genderCtrl = new FormControl('', [Validators.required]);
        this.skypeNameCtrl = new FormControl('', [Validators.required]);
        this.mailAddressCtrl = new FormControl('', [Validators.required]);
        this.passwordCtrl = new FormControl('', [Validators.required]);
        this.frenchLevelCtrl = new FormControl('', [Validators.required]);
        this.learningExprerienceCtrl = new FormControl('');
        this.purposeCtrl = new FormControl('', [Validators.required]);
        this.motherTongueCtrl = new FormControl('', [Validators.required]);
        this.howFindedCtrl = new FormControl('', [Validators.required]);
        this.otherLang1Ctrl = new FormControl('');
        this.otherLang2Ctrl = new FormControl('');
        this.birthYearCtrl = new FormControl('', [Validators.required]);
        this.birthMonthCtrl = new FormControl('', [Validators.required]);
        this.birthDayCtrl = new FormControl('', [Validators.required]);
        this.formCtrls = new FormGroup({
            customerName: this.customerNameCtrl,
            nickName: this.nickNameCtrl,
            jpName: this.jpNameCtrl,
            gender: this.genderCtrl,
            birthYear: this.birthYearCtrl,
            birthMonth: this.birthMonthCtrl,
            birthDay: this.birthDayCtrl,
            skypeName: this.skypeNameCtrl,
            mailAddress: this.mailAddressCtrl,
            password: this.passwordCtrl,
            frenchLevel: this.frenchLevelCtrl,
            learningExperience: this.learningExprerienceCtrl,
            purpose: this.purposeCtrl,
            motherTongue: this.motherTongueCtrl,
            howFinded: this.howFindedCtrl,
            otherLang1: this.otherLang1Ctrl,
            otherLang2: this.otherLang2Ctrl
        });
    }

    private createWeeksItems(): void {
        const currentYear = new Date().getFullYear();
        for (let i = 0; i < 50; i++) this.itemOfYear.push(currentYear - i);
        this.itemOfMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            .map((v, i) => ({ label: v, value: i }));
    }

    public get returnMatchOfDays(): number[] {
        let loopIndex: number;
        const _y = +this.formCtrls.controls['birthYear'].value;
        const _m = +this.formCtrls.controls['birthMonth'].value + 1;

        if ((_m < 8 && _m % 2 !== 0) || (_m >= 8 && _m % 2 === 0)) loopIndex = 31;
        else if (_m === 2) {
            if (!(_y % 4) && (_y % 100) || !(_y % 400)) loopIndex = 29;
            else loopIndex = 28;
        } else loopIndex = 30;

        const value = [];
        for (let i = 1; i <= loopIndex; i++) value.push(i);
        return value;

    }

    public onSubmit(items) {
        console.log(items);
    }

}
