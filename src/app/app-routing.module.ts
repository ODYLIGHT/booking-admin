import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopMenuComponent } from './top-menu/top-menu.component';

// routing設定は開発時のアクセスを簡略化するため
// リダイレクト設定をざるにしてます
const routes: Routes = [
    { path: '', redirectTo: 'administrator/top', pathMatch: 'full' },
    {
        path: 'administrator',
        children: [
            { path: '', redirectTo: 'top', pathMatch: 'full' },
            {
                path: 'top',
                component: TopMenuComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
