import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from '../material.module';
import { CommonsModule } from '../commons/commons.module';

import { RegisterBookingComponent } from './register-booking/register-booking.component';
import { OperationsComponent } from './register-booking/operations/operations.component';
import { BookingTableComponent } from './register-booking/booking-table/booking-table.component';

import { SearchBookingComponent } from './search-booking/search-booking.component';
import { BookingSearchComponent } from './search-booking/booking-search/booking-search.component';
import { BookingListComponent, MyDialogComponent } from './search-booking/booking-list/booking-list.component';

import { CheckTeacherScheduleComponent } from './check-teacher-schedule/check-teacher-schedule.component';
import {
    CheckTeacherScheduleFormComponent
} from './check-teacher-schedule/check-teacher-schedule-form/check-teacher-schedule-form.component';
import {
    CheckTeacherScheduleTableComponent
} from './check-teacher-schedule/check-teacher-schedule-table/check-teacher-schedule-table.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonsModule,
        NgbModule
    ],
    declarations: [
        RegisterBookingComponent,
        OperationsComponent,
        BookingTableComponent,
        SearchBookingComponent,
        BookingSearchComponent,
        BookingListComponent,
        MyDialogComponent,
        CheckTeacherScheduleComponent,
        CheckTeacherScheduleFormComponent,
        CheckTeacherScheduleTableComponent
    ],
    exports: [
        RegisterBookingComponent,
        SearchBookingComponent,
        CheckTeacherScheduleComponent
    ],
    entryComponents: [MyDialogComponent]
})
export class ReservationModule { }
