import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CustomerState, ListState } from '../../store/types';
import { EditProfileService } from './edit-profile.service';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
    providers: [EditProfileService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditProfileComponent implements OnInit {
    public CustomerProfileForm: FormGroup;
    public pageHeaderTitle = 'Add new student';
    public pullDownMenes: ListState = {
        french_levels: [], purpose: [], languages: [], finded_tools: [], program_code: [], remark: [], client_code: []
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private service: EditProfileService
    ) { this.initFormGroup() }

    ngOnInit() {
        this.service.getPullDownMenusApi.subscribe((menus: ListState) => this.pullDownMenes = menus);
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            // `id`がある場合は顧客情報の修正、ない場合は新規登録です
            // 修正のときはidから個人情報を取得し、FormGroupオブジェクトに割り当てて描画します
            const customerId = params.get('id') ? +params.get('id') : null;
            if (customerId) {
                this.pageHeaderTitle = 'Overview of Student Information'
                this.getProfile(customerId).subscribe(
                    state => {
                        if (!!!state || !!!Object.keys(state))
                            return window.alert(`Request id:${customerId}, but there is no target data.`);
                        this.setFromGroup(state);
                    },
                    (err: HttpErrorResponse) => {
                        const errorMessage =
                            'There was a problem on the server side.\n'
                            + 'Please give the administrator the following message / code.\n'
                            + `[message]: ${err.statusText}\n`
                            + `[code]: ${err.status}\n`
                            ;
                        window.alert(errorMessage);
                    }
                )
            }
        });
    }

    private initFormGroup(): void {
        this.CustomerProfileForm = this.fb.group({
            id: null,
            name: ['', Validators.required],
            time_zone: ['', Validators.required],
            gender: [null, Validators.required],
            birthday: [null, Validators.required],
            skype_name: [
                '',
                [Validators.required, Validators.pattern(/^[a-z][a-zA-Z0-9.,-_]*$/)]
            ],
            mail_address: [
                '',
                [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]
            ],
            password: [
                '',
                [Validators.required, Validators.minLength(6), Validators.maxLength(12)]
            ],
            french_level: [null, Validators.required],
            learning_experience: '',
            purpose: ['', Validators.required],
            mother_tongue: ['', Validators.required],
            how_finded: ['', Validators.required],
            other_language1: '',
            other_language1_level: null,
            other_language2: '',
            other_language2_level: null,
            program_code: '',
            remark: '',
            client_code: ''
        });
    }

    private setFromGroup(state?: CustomerState) { this.CustomerProfileForm.setValue(state) }

    private getProfile(id: number): Observable<CustomerState> { return this.service.getProfileApi(id) }

    public onSubmit(form: FormGroup): void {
        console.log(form.value);
    }

}
