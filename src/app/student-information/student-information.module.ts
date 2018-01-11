import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';

import { CreditInformationComponent } from './credit-information/credit-information.component';

import { OverviewComponent } from './overview/overview.component';

import { StudentInformationComponent } from './student-information/student-information.component';
import { InformationSearchFormComponent } from './student-information/information-search-form/information-search-form.component';
import { InformationTableComponent } from './student-information/information-table/information-table.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        CreditInformationComponent,
        OverviewComponent,
        StudentInformationComponent,
        InformationSearchFormComponent,
        InformationTableComponent
    ]
})
export class StudentInformationModule { }
