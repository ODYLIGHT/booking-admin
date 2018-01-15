import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { BookingListComponent, MyDialogComponent } from './search-booking/booking-list/booking-list.component';

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
        CheckTeacherScheduleComponent,
        CheckScheduleSearchFormComponent,
        CheckTableComponent,
        RegisterBookingComponent,
        OperationsComponent,
        BookingTableComponent,
        SearchBookingComponent,
        BookingSearchComponent,
        BookingListComponent,
        MyDialogComponent
    ],
    exports: [
        CheckTeacherScheduleComponent,
        RegisterBookingComponent,
        SearchBookingComponent
    ],
    entryComponents: [MyDialogComponent]
})
export class ReservationModule { }
