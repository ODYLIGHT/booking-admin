import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopMenuComponent } from './top-menu/top-menu.component';

const routes: Routes = [
    { path: '', redirectTo: 'top', pathMatch: 'full' },
    {
        path: 'top',
        component: TopMenuComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
