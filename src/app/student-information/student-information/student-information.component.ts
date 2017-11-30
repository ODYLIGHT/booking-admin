import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StudentInformationService } from './student-information.service';
import { StudentInformationStore } from './student-information.store';
import { SearchedStudentInformationState } from '../../store/types';

@Component({
    selector: 'app-student-information',
    templateUrl: './student-information.component.html',
    styleUrls: ['./student-information.component.scss'],
    providers: [ StudentInformationService, StudentInformationStore ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentInformationComponent implements OnInit {

    constructor( private service: StudentInformationService ) { }

    ngOnInit() {
    }

    public search(event): void { this.service.getSearchStudent(event) }

    public get studentAsObservable$(): Observable<SearchedStudentInformationState[]> { return this.service.students$.map(s => s) }

}
