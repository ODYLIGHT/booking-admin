import { NgModule } from '@angular/core';
import {
    MatCheckboxModule, MatSnackBarModule, MatButtonModule
} from '@angular/material';

@NgModule({
    imports: [
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonModule
    ],
    exports: [
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonModule
    ]
})
export class MaterialModule { }
