import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SidenavComponent} from '../../@views/sidenav/sidenav.component';
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule, MatChipsModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {FloatingButtonComponent} from '../../@views/floating-button/floating-button.component';
import {ChatComponent} from '../../@views/chat/chat.component';
import {HomeComponent} from '../../@views/home/home.component';
import {OfficeComponent} from '../../@views/office/office.component';
import {HttpClientModule} from '@angular/common/http';
import {EpitechComponent} from '../../@views/epitech/epitech.component';
import {GoogleComponent} from '../../@views/google/google.component';
import {AmazonComponent} from '../../@views/amazon/amazon.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ChatComponent,
    HomeComponent,
    OfficeComponent,
    EpitechComponent,
    GoogleComponent,
    AmazonComponent,
    SidenavComponent,
    FloatingButtonComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    DashboardRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatTooltipModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatBadgeModule
  ],
  providers: [],
})
export class DashboardModule {
}
