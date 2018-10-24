import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
