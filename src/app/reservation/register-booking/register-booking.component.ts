import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RegisterBookingService } from './register-booking.service';
import { RegisterBookingStore } from './register-booking.store';
import { SearcherCustomerState, RegisterBookingTeachersState, ScheduleState } from '../../store/types';

@Component({
    selector: 'app-register-booking',
    templateUrl: './register-booking.component.html',
    styleUrls: ['./register-booking.component.scss'],
    providers: [RegisterBookingService, RegisterBookingStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterBookingComponent implements OnInit {
    private scheduleAsObservable = new BehaviorSubject<{ title: string; value: ScheduleState[] }[]>(null);
    public userId: number;

    constructor(
        private service: RegisterBookingService
    ) { }

    ngOnInit() { this.service.getInit() }

    public get teachersAsObservable$(): Observable<RegisterBookingTeachersState[]> {
        return this.service.getItems$.map(s => s);
    }

    public get scheduleAsObservable$(): Observable<{ title: string; value: ScheduleState[] }[]> {
        return this.scheduleAsObservable;
    }

    /**
     * 顧客の予約情報を取得する
     * @param event 顧客ID
     */
    public search(event: number): void {
        console.log(event);
        this.userId = event;
    }

    public post(event) {
        console.log(`api post called...`);
        this.service.post();
    }

    /**
     * 講師を選択することで、そのスケジュールを取得する
     * @param event 講師ID
     */
    public selectTeacher(event: number) {
        if (!!!event) return this.scheduleAsObservable.next(null);
        this.service.getSchedule(event)
            .subscribe(res => this.scheduleAsObservable.next(res));
    }

    public get showWeeks() { return this.service.showsWeeks }

    public switchWeek(event): void {
        this.service.switchWeek(event);
    }

    public convertSchedule(item) { return this.service.convertSchedule(item) }

}
