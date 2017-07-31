import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// global import for Observable.map
import 'rxjs/add/operator/map';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { RegisterTeachersComponent } from './teacher-information/register-teachers/register-teachers.component';
import { TeacherScheduleComponent } from './teacher-information/teacher-schedule/teacher-schedule.component';
import { StudentInformationComponent } from './student-information/student-information/student-information.component';
import { RegisterBookingComponent } from './reservation/register-booking/register-booking.component';
import { SearchBookingComponent } from './reservation/search-booking/search-booking.component';
import { CheckTeacherScheduleComponent } from './reservation/check-teacher-schedule/check-teacher-schedule.component';
import { SchoolInformationComponent } from './administration/school-information/school-information.component';
import { RegisterAdministratorsComponent } from './administration/register-administrators/register-administrators.component';
import { SettingAuthorityComponent } from './administration/setting-authority/setting-authority.component';
import { PullDownMenuComponent } from './system-setting/pull-down-menu/pull-down-menu.component';
import { TimeLimitComponent } from './system-setting/time-limit/time-limit.component';
import { TimeZoneComponent } from './system-setting/time-zone/time-zone.component';
import { PaypalComponent } from './system-setting/paypal/paypal.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TopMenuComponent,
        RegisterTeachersComponent,
        TeacherScheduleComponent,
        StudentInformationComponent,
        RegisterBookingComponent,
        SearchBookingComponent,
        CheckTeacherScheduleComponent,
        SchoolInformationComponent,
        RegisterAdministratorsComponent,
        SettingAuthorityComponent,
        PullDownMenuComponent,
        TimeLimitComponent,
        TimeZoneComponent,
        PaypalComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
