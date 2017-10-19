import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SearchBookingState } from '../../../store/types';
import { CancellationBookingComponent } from '../cancellation-booking/cancellation-booking.component';

@Component({
    selector: 'app-search-table',
    templateUrl: './search-table.component.html',
    styleUrls: ['./search-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTableComponent implements OnInit {
    @Input() bookings: Object[];
    @Output() canceller = new EventEmitter<Object>();

    constructor(
        private router: Router,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
    }

    public createEndTime(str: string): string {
        const min = str.split(':');
        if ((/00/ig).test(min[1])) return `${min[0]}:25`;
        else return `${min[0]}:55`;
    }

    onCancel(obj) {
        const modalRef = this.modalService.open(CancellationBookingComponent, {size: 'lg'});
        modalRef.componentInstance.cancelReservation = obj;
        modalRef.result
        .then(v => {
            if (!!!v) return;
            this.canceller.next(v);
        })
        .catch(err => {
            console.log(err);
        });
    }

}
