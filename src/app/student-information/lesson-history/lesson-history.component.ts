import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ExtendsMomentService } from './extends.moment.service';
import { LessonHistoryService } from './lesson-history.service';
import { LessonHistoryStore, HistortyState } from './lesson-history.store';
import { ReservationState } from '../../store/types';

@Component({
    selector: 'app-lesson-history',
    templateUrl: './lesson-history.component.html',
    styleUrls: ['./lesson-history.component.scss'],
    providers: [ExtendsMomentService, LessonHistoryService, LessonHistoryStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonHistoryComponent implements OnInit {
    private utcDate;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private exMomentService: ExtendsMomentService,
        private service: LessonHistoryService
    ) { }

    ngOnInit() {
        this.utcDate = this.exMomentService.getUtc;
        this.route.paramMap.subscribe((params: ParamMap) => {
            const id = params.get('id') ? +params.get('id') : null;
            this.service.initApi(id);
        });
    }

    /**
     * after === true: これからの予約情報を返す
     * after === false: 既に受講等が済んだ情報を返す
     */
    public selectReservations(items: ReservationState[], after: boolean) {
        const utcTimeStamp = new Date(this.utcDate).getTime();
        const selectedAry = items.filter(item => {
            const isAfterTime = new Date(item.reserved_date).getTime() > utcTimeStamp;
            if (after) return isAfterTime;
            else return !!!isAfterTime;
        });
        return selectedAry;
    }

    public onChange(value: string) { this.service.changeLevelApi(value) }

    public onRegister(params) { this.service.registerApi(params.value) }

    public get historyItemsAsObservable$(): Observable<HistortyState> { return this.service.getHistoryItems$ }

}
