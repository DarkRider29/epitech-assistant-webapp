import { Component, OnInit } from '@angular/core';
import {GoogleService} from '../../@shared/services/api/google/google.service';
import {AnimationError, AnimationLoading, AnimationSuccess} from '../../@shared/animations/animations';
import {MatSnackBar} from '@angular/material';

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
  public animationSuccess: Object;
  public animationLoading: Object;
  public animationError: Object;
  private animSuccess: any;
  private animLoading: any;
  private animError: any;

  constructor(private googleService: GoogleService, public snackBar: MatSnackBar) {
    this.animationSuccess = AnimationSuccess;
    this.animationLoading = AnimationLoading;
    this.animationError = AnimationError;
  }

  ngOnInit() {
    this.refreshUser();
    this.popup = false;
    this.logged = false;
    this.endPopup = false;
  }

  refreshUser() {
    if (this.googleService.isAuthenticated()) {
      this.googleService.getUser().then((r => {
        console.log(r);
        this.firstName = r.first_name;
        this.lastName = r.last_name;
        this.nickName = r.nickname;
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
    });
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
}
