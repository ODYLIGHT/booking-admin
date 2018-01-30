import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HeaderService } from './header.service';
import { HeaderStore } from './header.store';
import { MenuState } from '../store/types';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [HeaderService, HeaderStore],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

    constructor(private service: HeaderService) { }

    ngOnInit() { this.service.getInit() }

    public get getMenusAsObservable$(): Observable<MenuState[]> { return this.service.getItems$.pipe(map(s => s)) }

}
