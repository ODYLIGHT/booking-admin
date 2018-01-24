import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LessonHistoryService } from './lesson-history.service';
import { LessonHistoryStore, HistortyState } from './lesson-history.store';
import { ReservationState } from '../../store/types';

@Component({
    selector: 'app-lesson-history',
    templateUrl: './lesson-history.component.html',
    styleUrls: ['./lesson-history.component.scss'],
    providers: [LessonHistoryService, LessonHistoryStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonHistoryComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: LessonHistoryService
    ) { }

    ngOnInit() {
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
        console.log(items);
        return items
    }

    public onChange(value: string) { this.service.changeLevelApi(value) }

    public get historyItemsAsObservable$(): Observable<HistortyState> { return this.service.getHistoryItems$ }

}
