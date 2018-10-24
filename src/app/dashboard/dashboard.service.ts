import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class DashboardService implements CanActivate{

  constructor(public authService: AuthService, private router: Router) {
  }

  canActivate(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getCurrentUser().then((u => {
        console.error(u);
      }));
      if (this.authService.isAuthenticated())
        resolve(true);
      else {
        this.router.navigate(['/login']);
        reject(false);
      }
    });
  }

}
