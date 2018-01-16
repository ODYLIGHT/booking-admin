import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopMenuComponent } from './top-menu/top-menu.component';

import { RegisterTeachersComponent } from './teacher-information/register-teachers/register-teachers.component';
import { TeacherScheduleComponent } from './teacher-information/teacher-schedule/teacher-schedule.component';
import { TeacherFormsComponent } from './teacher-information/register-teachers/teacher-forms/teacher-forms.component';

import { StudentInformationComponent } from './student-information/student-information/student-information.component';
import { OverviewComponent } from './student-information/overview/overview.component';
import { CreditInformationComponent } from './student-information/credit-information/credit-information.component';

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

// routing設定は開発時のアクセスを簡略化するため
// リダイレクト設定をざるにしてます
const routes: Routes = [
    { path: '', redirectTo: 'administrator/top', pathMatch: 'full' },
    {
        path: 'administrator',
        children: [
            { path: '', redirectTo: 'top', pathMatch: 'full' },
            { path: 'top', component: TopMenuComponent },
            {
                path: 'register-teachers',
                children: [
                    { path: '', component: RegisterTeachersComponent },
                    { path: 'insert', component: TeacherFormsComponent },
                    { path: 'edit/:id', component: TeacherFormsComponent }
                ]
            },
            {
                path: 'teacher-schedule', component: TeacherScheduleComponent },
            { path: 'register-booking', component: RegisterBookingComponent },
            {
                path: 'search-booking',
                children: [
                    { path: '', component: SearchBookingComponent }
                ]
            },
            { path: 'check-teachers-schedule', component: CheckTeacherScheduleComponent },
            {
                path: 'student-information',
                children: [
                    { path: '', component: StudentInformationComponent },
                    { path: 'overview/:id', component: OverviewComponent },
                    { path: 'credit-information', component: CreditInformationComponent }
                ]
            }, // Children will be added
            { path: 'school-information', component: SchoolInformationComponent },
            { path: 'register-administrators', component: RegisterAdministratorsComponent },
            { path: 'setting-authority', component: SettingAuthorityComponent },
            { path: 'pull-down-menu', component: PullDownMenuComponent },
            { path: 'time-limit', component: TimeLimitComponent },
            { path: 'time-zone', component: TimeZoneComponent },
            { path: 'paypal', component: PaypalComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
