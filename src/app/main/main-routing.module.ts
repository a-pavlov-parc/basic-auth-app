import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { NotAuthPagesGuard } from '@core/guards/not-auth-pages.guard';
import { appDefaultPath } from '@core/core.constants';

const routes: Routes = [
    {
        path: '',
        redirectTo: appDefaultPath,
        pathMatch: 'full'
    },
    {
        path: 'signin',
        component: LoginPageComponent,
        canActivate: [NotAuthPagesGuard]
    },
    {
        path: 'dashboard',
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
    },
    { path: '**', redirectTo: appDefaultPath }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class MainRoutingModule {}
