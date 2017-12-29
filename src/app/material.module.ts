import { NgModule } from '@angular/core';
import {
    MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatOptionModule, MatRadioModule,
    MatCheckboxModule, MatSnackBarModule, MatButtonModule
} from '@angular/material';

@NgModule({
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonModule
    ],
    exports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatButtonModule
    ]
})
export class MaterialModule { }
