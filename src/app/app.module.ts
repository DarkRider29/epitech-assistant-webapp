import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {RouterModule} from '@angular/router';
import {rootRouterConfig} from './app.routes';
import {DashboardModule} from './dashboard/dashboard.module';
import {DashboardService} from './dashboard/dashboard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false, enableTracing: true }),
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthService, AuthGuard, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
