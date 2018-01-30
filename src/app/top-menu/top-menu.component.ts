import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TopMenuService } from './top-menu.service';
import { TopMenuStore } from './top-menu.store';
import { MenuState } from '../store/types';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss'],
    providers: [TopMenuService, TopMenuStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent implements OnInit {

    constructor(private service: TopMenuService) { }

    ngOnInit() { this.service.getInit() }

    public get getMenusAsObservable$(): Observable<MenuState[]> { return this.service.getItems$ }

}
