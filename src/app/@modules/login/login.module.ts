import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatButtonModule, MatCardModule, MatSnackBarModule, MatTooltipModule} from '@angular/material';
import {AuthService} from '../../@shared/services/auth/auth.service';
import {LottieAnimationViewModule} from 'ng-lottie';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LottieAnimationViewModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
    HttpClientModule
  ],
  providers: [AuthService],
  exports: [LoginComponent]
})
export class LoginModule { }
