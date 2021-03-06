import {Component, OnInit} from '@angular/core';
import {GoogleService} from '../../@shared/services/api/google/google.service';
import {AnimationError, AnimationLoading, AnimationSuccess} from '../../@shared/animations/animations';
import {MatSnackBar} from '@angular/material';
import {AccountService} from '../../@shared/services/account/account.service';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['../styles/cards.scss', './google.component.scss']
})
export class GoogleComponent implements OnInit {

  firstName: string;
  lastName: string;
  nickName: string;
  imageToShow: string;
  popup: boolean;
  logged: boolean;
  endPopup: boolean;
  private linked: boolean;
  public animationSuccess: Object;
  public animationLoading: Object;
  public animationError: Object;
  private animSuccess: any;
  private animLoading: any;
  private animError: any;

  constructor(private googleService: GoogleService, public snackBar: MatSnackBar, private accountService: AccountService) {
    this.animationSuccess = AnimationSuccess;
    this.animationLoading = AnimationLoading;
    this.animationError = AnimationError;
    this.linked = false;
  }

  ngOnInit() {
    this.refreshUser();
    this.popup = false;
    this.logged = false;
    this.endPopup = false;
    this.linked = this.accountService.isGoogleLinked();
  }

  refreshUser() {
    if (this.googleService.isAuthenticated()) {
      this.googleService.getUser().then((r => {
        this.firstName = r.first_name;
        this.lastName = r.last_name;
        this.nickName = r.name;
        this.imageToShow = r.thumbnail;
      }));
    } else {
      this.imageToShow = '';
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

  loginGoogle() {
    this.popup = true;
    this.googleService.login().then(r => {
      this.endPopup = true;
      this.popup = false;
      this.logged = this.isLogged();
      if (r) {
        setTimeout(() => this.endPopup = false, 2000);
        this.snackBar.open('Connexion avec Google réussie !', 'Fermer', {
          duration: 2000
        });
      } else {
        setTimeout(() => this.endPopup = false, 2000);
        this.snackBar.open('Une erreur est survenue lors de la connexion avec Google !', 'Fermer', {
          duration: 3000
        });
      }
      this.refreshUser();
      this.createAccount();
    });
  }

  createAccount() {
    this.googleService.getUser().then((r => {
      this.accountService.createUser(r.id, 'google');
    }));
  }

  logoutGoogle() {
    this.googleService.logout().then(r => {
      this.snackBar.open('Vous vous êtes déconnecté de Google !', 'Fermer', {
        duration: 3000
      });
      this.endPopup = false;
      this.refreshUser();
    });
  }

  isLogged() {
    return this.googleService.isAuthenticated();
  }

  isLinked() {
    return this.accountService.isGoogleLinked();
  }

  unLink() {
    this.accountService.deleteAccount('google');
    this.snackBar.open('Vous avez supprimer vos comptes Google !', 'Fermer', {
      duration: 3000
    });
  }
}
