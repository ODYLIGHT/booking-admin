import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor( private router: Router ) { }

    ngOnInit() { }

    public onClick(id: number) { this.router.navigate(['/administrator/student-information/overview', id]) }

}
