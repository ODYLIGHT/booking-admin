import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { OptionItemsState } from '../teacher-schedule.store';

@Component({
    selector: 'app-operations',
    templateUrl: './operations.component.html',
    styleUrls: ['./operations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OperationsComponent implements OnInit {
    @Input() options: OptionItemsState[];
    @Output() selectEvent = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    public onChange(e: MatSelectChange): void {
        const idx = e.value;
        this.selectEvent.emit(this.options[idx]);
    }

}
