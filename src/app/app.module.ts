import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// global import for Observable.map
import 'rxjs/add/operator/map';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TopMenuComponent
    ],
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        HttpModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
