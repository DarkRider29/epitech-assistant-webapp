import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardService} from './dashboard.service';
import {AuthGuard} from '../auth/auth.guard';

const ROUTES: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [DashboardService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
