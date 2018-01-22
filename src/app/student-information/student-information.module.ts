import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '../material.module';

import { StudentInformationComponent } from './student-information.component';
import { InformationFormComponent } from './information-form/information-form.component';
import { InformationTableComponent } from './information-table/information-table.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LessonHistoryComponent } from './lesson-history/lesson-history.component';
import { CreditInformationComponent } from './credit-information/credit-information.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule
    ],
    declarations: [
        StudentInformationComponent,
        InformationFormComponent,
        InformationTableComponent,
        EditProfileComponent,
        LessonHistoryComponent,
        CreditInformationComponent
    ]
})
export class StudentInformationModule { }
