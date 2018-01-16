import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';

import { StudentInformationComponent } from './student-information.component';
import { InformationFormComponent } from './information-form/information-form.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        StudentInformationComponent,
        InformationFormComponent
    ]
})
export class StudentInformationModule { }
