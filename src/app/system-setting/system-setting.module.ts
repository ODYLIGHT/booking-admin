import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';

import { PaypalComponent } from './paypal/paypal.component';

import { PullDownMenuComponent } from './pull-down-menu/pull-down-menu.component';

import { TimeLimitComponent } from './time-limit/time-limit.component';

import { TimeZoneComponent } from './time-zone/time-zone.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PaypalComponent,
        PullDownMenuComponent,
        TimeLimitComponent,
        TimeZoneComponent
    ]
})
export class SystemSettingModule { }
