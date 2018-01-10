import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeTableComponent } from './time-table/time-table.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TimeTableComponent
    ],
    exports: [
        TimeTableComponent
    ]
})
export class CommonsModule { }
