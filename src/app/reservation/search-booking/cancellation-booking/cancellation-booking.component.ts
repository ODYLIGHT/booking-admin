import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { SearchBookingState } from '../../../store/types';

@Component({
    selector: 'app-cancellation-booking',
    templateUrl: './cancellation-booking.component.html',
    styleUrls: ['./cancellation-booking.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CancellationBookingComponent implements OnInit {
    public cancelReservation: SearchBookingState;
    public issue = '';

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
    }

    public createEndTime(str: string): string {
        const min = str.split(':');
        if ((/00/ig).test(min[1])) return `${min[0]}:25`;
        else return `${min[0]}:55`;
    }

    public onCancel() {
        if (window.confirm('Are you sure you want to cancel this slot?')) {
            const canceled = Object.assign(this.cancelReservation, { classIssue: this.issue });
            this.activeModal.close(canceled);
        } else {
            return;
        }
    }

}
