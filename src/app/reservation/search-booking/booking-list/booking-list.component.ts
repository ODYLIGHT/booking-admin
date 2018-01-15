import { Component, OnInit, Input, Output, EventEmitter, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BookingState } from '../../../store/types';

@Component({
    selector: 'app-booking-list',
    templateUrl: './booking-list.component.html',
    styleUrls: ['./booking-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingListComponent implements OnInit {
    private _bookings: BookingState[];
    @Input()
    set bookings(item: BookingState[]) { this._bookings = item }
    get bookings(): BookingState[] { return this._bookings }
    @Output() cancelEvent = new EventEmitter();
    public currentPage = 1;
    public itemPerPage = 10;

    constructor(private dialog: MatDialog) { }

    ngOnInit() { }

    public sliceItems(items: BookingState[]): BookingState[] {
        return items.slice((this.currentPage - 1) * this.itemPerPage, this.currentPage * this.itemPerPage);
    }

    public openDialog(item: BookingState): void {
        const dialogRef = this.dialog.open(MyDialogComponent, {
            data: item
        });
        dialogRef.afterClosed().subscribe(res => {
            if (!!!res) return;
            this.cancelEvent.emit(res);
        })
    }

}

@Component({
    selector: 'app-mat-dialog',
    template: `
    <h1 mat-dialog-title>booking number: {{ data.reserved_id }}</h1>
    <mat-dialog-content>Are you sure want to cancel this slot?</mat-dialog-content>
    <mat-dialog-actions align="center">
        <button mat-button mat-dialog-close>No thanks</button>
        <button mat-button [mat-dialog-close]="data.reserved_id">Done</button>
    </mat-dialog-actions>
    `
})
export class MyDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<MyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }
}
