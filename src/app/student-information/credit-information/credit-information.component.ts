import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { CreditInformationService } from './credit-information.service';
import { CreditInformationStore } from './credit-information.store';

@Component({
    selector: 'app-credit-information',
    templateUrl: './credit-information.component.html',
    styleUrls: ['./credit-information.component.scss'],
    providers: [ CreditInformationService, CreditInformationStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditInformationComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: CreditInformationService,
        private store: CreditInformationStore
    ) { }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => {
                this.service.getCreditApi(params);
            });
    }

}
