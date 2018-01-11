import { Component, OnInit, OnChanges, Output, Input, EventEmitter, SimpleChange, ChangeDetectionStrategy } from '@angular/core';

import { MomentService } from '../../../services/moment.service';
import { BookingTableService } from './booking-table.service';
import {
    SearchCustomerState, BookingState
} from '../register-booking.store';

@Component({
    selector: 'app-booking-table',
    templateUrl: './booking-table.component.html',
    styleUrls: ['./booking-table.component.scss'],
    providers: [BookingTableService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingTableComponent implements OnInit {
    private _customer: SearchCustomerState;
    @Input()
    set customer(c: SearchCustomerState) { this._customer = c }
    get customer(): SearchCustomerState { return this._customer }
    private _booking: BookingState;
    @Input()
    set booking(b: BookingState) { this._booking = b }
    get booking(): BookingState { return this._booking }
    public additionalNumber = 0;
    public weekOfPeriod = '';

    constructor(
        private moment: MomentService,
        private service: BookingTableService
    ) { }

    ngOnInit() { }

    public get getTimeIntervalFromTimeZone(): string { return this.moment.timeIntervalFromTimeZone(this.customer.time_zone) }

    public prevWeek() { --this.additionalNumber }

    public nextWeek() { ++this.additionalNumber }

    public observerForDayOfWeek(e: Date[]): void {
        this.weekOfPeriod =
            `${this.service.convertFormat(e[0], 'DD.MMM.YYYY')} - ${this.service.convertFormat(e[6], 'DD.MMM.YYYY')}`;
    }

    public clickObserver(event: { targetColumn: string; action: string; value: string; }) {
        // 予約不可時間帯がクリックされた場合は処理を終える
        if (this.booking.canNotReserve.includes(event.value)) return;
        console.log(event);
        console.log(this.booking);
    }

}
