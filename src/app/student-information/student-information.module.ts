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

import { CreditInformationComponent } from './credit-information/credit-information.component';

import { LessonHistoryComponent } from './lesson-history/lesson-history.component';
import { CustomerInfoComponent } from './lesson-history/customer-info/customer-info.component';
import { ReservationsTableComponent } from './lesson-history/reservations-table/reservations-table.component';
import { HistoryTableComponent } from './lesson-history/history-table/history-table.component';

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
        CreditInformationComponent,
        CustomerInfoComponent,
        ReservationsTableComponent,
        HistoryTableComponent
    ]
})
export class StudentInformationModule { }
