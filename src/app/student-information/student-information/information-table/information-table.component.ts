import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchedStudentInformationState } from '../../../store/types';

@Component({
    selector: 'app-information-table',
    templateUrl: './information-table.component.html',
    styleUrls: ['./information-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformationTableComponent implements OnInit {
    @Input() studentsAsObservable: Observable<SearchedStudentInformationState[]>;

    constructor() { }

    ngOnInit() {
    }

}
