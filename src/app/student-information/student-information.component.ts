import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StudentInformationService } from './student-information.service';
import { StudentInformationStore } from './student-information.store';

@Component({
    selector: 'app-student-information',
    templateUrl: './student-information.component.html',
    styleUrls: ['./student-information.component.scss'],
    providers: [StudentInformationService, StudentInformationStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentInformationComponent implements OnInit {

    constructor() { }

    ngOnInit() { }

    public onSearch(args): void {
        console.log(args);
    }

}
