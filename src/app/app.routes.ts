import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
];
