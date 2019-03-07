import {Component, OnInit} from '@angular/core';
import {AmazonService} from '../../@shared/services/api/amazon/amazon.service';
import {MatSnackBar} from '@angular/material';
import {AnimationError, AnimationLoading, AnimationSuccess} from '../../@shared/animations/animations';
import {AccountService} from '../../@shared/services/account/account.service';
import util from 'util';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['../styles/cards.scss', './amazon.component.scss']
})
export class AmazonComponent implements OnInit {

  firstName: string;
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

  constructor(private amazonService: AmazonService, public snackBar: MatSnackBar, private accountService: AccountService) {
    this.animationSuccess = AnimationSuccess;
    this.animationLoading = AnimationLoading;
    this.animationError = AnimationError;
    this.linked = false;
  }

  ngOnInit() {
    this.popup = false;
    this.logged = false;
    this.endPopup = false;
    this.refreshUser();
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

  refreshUser() {
    if (this.amazonService.isAuthenticated()) {
      this.amazonService.getUser().then((r => {
        this.firstName = r.name;
        this.nickName = r.email;
      }));
    } else {
      this.imageToShow = '';
    }
  }

  loginAmazon() {
    this.popup = true;
    this.amazonService.login().then(r => {
      this.endPopup = true;
      this.popup = false;
      this.logged = r;
      if (r) {
        setTimeout(() => this.endPopup = false, 2000);
        this.snackBar.open('Connexion avec Amazon réussie !', 'Fermer', {
          duration: 2000
        });
      } else {
        setTimeout(() => this.endPopup = false, 2000);
        this.snackBar.open('Une erreur est survenue lors de la connexion avec Amazon !', 'Fermer', {
          duration: 3000
        });
      }
      this.refreshUser();
      this.createAccount();
    });
  }

  createAccount() {
    this.amazonService.getUser().then((r => {
      this.accountService.createUser(r.user_id, 'amazon');
    }));
  }

  logoutAmazon() {
    this.amazonService.logout().then(r => {
      this.snackBar.open('Vous vous êtes déconnecté de Amazon !', 'Fermer', {
        duration: 3000
      });
      this.endPopup = false;
      this.refreshUser();
    });
  }

  isLogged() {
    return this.amazonService.isAuthenticated();
  }

  isLinked() {
    return this.accountService.isAmazonLinked();
  }

  unLink() {
    this.accountService.deleteAccount('amazon');
    this.snackBar.open('Vous avez supprimer vos comptes Amazon !', 'Fermer', {
      duration: 3000
    });
  }
}
