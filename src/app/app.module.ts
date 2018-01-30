import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { AdministrationModule } from './administration/administration.module';
import { ReservationModule } from './reservation/reservation.module';
import { StudentInformationModule } from './student-information/student-information.module';
import { SystemSettingModule } from './system-setting/system-setting.module';
import { TeacherInformationModule } from './teacher-information/teacher-information.module';

import { MomentService } from './services/moment.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TopMenuComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AdministrationModule,
        ReservationModule,
        StudentInformationModule,
        SystemSettingModule,
        TeacherInformationModule
    ],
    providers: [
        MomentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
