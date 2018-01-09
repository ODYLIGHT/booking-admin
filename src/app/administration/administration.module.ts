import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterAdministratorsComponent } from './register-administrators/register-administrators.component';

import { SchoolInformationComponent } from './school-information/school-information.component';

import { SettingAuthorityComponent } from './setting-authority/setting-authority.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RegisterAdministratorsComponent,
        SchoolInformationComponent,
        SettingAuthorityComponent
    ]
})
export class AdministrationModule { }
