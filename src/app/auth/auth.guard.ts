import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser()
        .then(user => {
          console.log("Connected!");
          this.router.navigate(['/dashboard']);
          return resolve(false);
        }, err => {
          console.log("Not connected!");
          return resolve(true);
        });
    });
  }
}
