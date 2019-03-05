import {Component} from '@angular/core';
import {AuthService} from '../../@shared/services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  constructor(public authService: AuthService,
              public snackBar: MatSnackBar,
              private router: Router) {
  }

  logout() {
    this.authService.logout().then(r => {
      this.snackBar.open('Vous vous êtes déconnecté !', 'Fermer', {
        duration: 2000
      });
      this.router.navigate(['/']);
    });
  }
}
