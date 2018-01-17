import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StudentInformationState } from '../store/types';
import { StudentInformationStore } from './student-information.store';
import { StudentInformationService } from './student-information.service';

@Component({
    selector: 'app-student-information',
    templateUrl: './student-information.component.html',
    styleUrls: ['./student-information.component.scss'],
    providers: [StudentInformationService, StudentInformationStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentInformationComponent implements OnInit {

    constructor(
        private service: StudentInformationService
    ) { }

    ngOnInit() { }

    public onSearch(args): void { this.service.getCustomerApi(args) }

    public get informationsAsObservable$(): Observable<StudentInformationState[]> { return this.service.getInformations$ }

}
