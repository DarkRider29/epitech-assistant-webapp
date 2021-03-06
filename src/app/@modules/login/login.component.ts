import {Component, NgZone, OnInit} from '@angular/core';
import {window} from 'rxjs/operators';
import {AuthService} from '../../@shared/services/auth/auth.service';
import {MatSnackBar} from '@angular/material';

import {AnimationSuccess, AnimationLoading, AnimationError} from '../../@shared/animations/animations';
import {Router} from '@angular/router';
import {OfficeService} from '../../@shared/services/api/office365/office.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  popup: boolean;
  logged: boolean;
  endPopup: boolean;
  public animationSuccess: Object;
  public animationLoading: Object;
  public animationError: Object;
  private animSuccess: any;
  private animLoading: any;
  private animError: any;


  constructor(public authService: AuthService,
              public snackBar: MatSnackBar,
              private zone: NgZone,
              private router: Router,
              private officeService: OfficeService) {
  this.animationSuccess = AnimationSuccess;
  this.animationLoading = AnimationLoading;
  this.animationError = AnimationError;
  }

  ngOnInit() {
    this.popup = false;
    this.logged = false;
    this.endPopup = false;
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  handleAnimationSuccess(anim: any) {
    this.animSuccess = anim;
  }

  handleAnimationLoading(anim: any) {
    this.animLoading = anim;
  }

  handleAnimationError(anim: any) {
    this.animError = anim;
  }

  loginOffice() {
    this.popup = true;
    this.authService.login().then(r => {
      this.endPopup = true;
      this.popup = false;
      if (r) {
        this.officeService.getUser().subscribe((u) => {
          if (/(\W|^)[\w.+\-]*@epitech\.eu(\W|$)/.test(u.mail)) {
            this.logged = true;
            this.snackBar.open('Connexion réussie, rédirection ...', 'Fermer', {
              duration: 2000
            });
            setTimeout(() => this.router.navigate(['/dashboard']), 2000);
          } else {
            this.logged = false;
            this.snackBar.open('Cette email n\'appartient pas à Epitech !', 'Fermer', {
              duration: 3000
            });
            this.authService.logout();
            setTimeout(() => this.endPopup = false, 2000);
          }
        });
      } else {
        this.logged = false;
        this.snackBar.open('Une erreur est survenue lors de la connexion !', 'Fermer', {
          duration: 3000
        });
        setTimeout(() => this.endPopup = false, 2000);
      }
    });
  }
}
