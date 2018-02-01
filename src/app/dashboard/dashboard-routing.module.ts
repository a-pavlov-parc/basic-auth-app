import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// providers
import { AuthGuard } from '../core/guards/auth.guard';

// components
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

const routes: Routes = [
    {
        path: ``,
        component: DashboardPageComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class DashboardRoutingModule {}
