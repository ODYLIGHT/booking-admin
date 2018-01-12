import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { CommonsModule } from '../commons/commons.module';

import { CheckTeacherScheduleComponent } from './check-teacher-schedule/check-teacher-schedule.component';
import { CheckScheduleSearchFormComponent } from './check-teacher-schedule/check-schedule-search-form/check-schedule-search-form.component';
import { CheckTableComponent } from './check-teacher-schedule/check-table/check-table.component';

import { RegisterBookingComponent } from './register-booking/register-booking.component';
import { OperationsComponent } from './register-booking/operations/operations.component';
import { BookingTableComponent } from './register-booking/booking-table/booking-table.component';

import { SearchBookingComponent } from './search-booking/search-booking.component';
import { BookingSearchComponent } from './search-booking/booking-search/booking-search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        CommonsModule
    ],
    declarations: [
        CheckTeacherScheduleComponent,
        CheckScheduleSearchFormComponent,
        CheckTableComponent,
        RegisterBookingComponent,
        OperationsComponent,
        BookingTableComponent,
        SearchBookingComponent,
        BookingSearchComponent
    ],
    exports: [
        CheckTeacherScheduleComponent,
        RegisterBookingComponent,
        SearchBookingComponent
    ]
})
export class ReservationModule { }
