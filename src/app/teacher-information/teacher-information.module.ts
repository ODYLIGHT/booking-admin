import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonsModule } from '../commons/commons.module';
import { MaterialModule } from '../material.module';

import { RegisterTeachersComponent } from './register-teachers/register-teachers.component';
import { TeacherFormsComponent } from './register-teachers/teacher-forms/teacher-forms.component';

import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';
import { OperationsComponent } from './teacher-schedule/operations/operations.component';
import { ScheduleTableComponent } from './teacher-schedule/schedule-table/schedule-table.component';

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonsModule
    ],
    declarations: [
        RegisterTeachersComponent,
        TeacherFormsComponent,
        TeacherScheduleComponent,
        OperationsComponent,
        ScheduleTableComponent
    ]
})
export class TeacherInformationModule { }
