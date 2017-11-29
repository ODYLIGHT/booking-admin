import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-student-information',
    templateUrl: './student-information.component.html',
    styleUrls: ['./student-information.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentInformationComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
