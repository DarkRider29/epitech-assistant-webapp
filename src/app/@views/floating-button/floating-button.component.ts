import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../@shared/services/auth/auth.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {

  constructor(public authService: AuthService,
              public snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().then(r => {
      this.snackBar.open('Vous vous etes déconnecté !', 'Fermer', {
        duration: 2000
      });
      this.router.navigate(['/']);
    });
  }
}
