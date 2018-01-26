import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { CustomerState, CreditState } from '../../store/types';
import { CreditInformationService } from './credit-information.service';
import { CreditInformationStore } from './credit-information.store';

@Component({
    selector: 'app-credit-information',
    templateUrl: './credit-information.component.html',
    styleUrls: ['./credit-information.component.scss'],
    providers: [CreditInformationService, CreditInformationStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditInformationComponent implements OnInit {
    public customerProfile: CustomerState;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: CreditInformationService
    ) { }

    ngOnInit() {
        this.route.queryParamMap.subscribe((params: ParamMap) => {
            this.customerProfile = {
                id: +params.get('id'),
                name_last: params.get('name_last'),
                name_first: params.get('name_first'),
                time_zone: params.get('time_zone')
            };
            this.service.getCreditsApi(this.customerProfile.id);
        });
    }

    public onRegister(params) { this.service.insertCreditApi(params) }

    /**
     * クレジットデータを登録日付で降順する
     */
    public creditsSorter(items: CreditState[]): CreditState[] {
        return items.sort((a: CreditState, b: CreditState) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    public get creditsAsObservable$(): Observable<CreditState[]> { return this.service.getCredits$ }

}
