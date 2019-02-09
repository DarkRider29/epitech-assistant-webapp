import { Component, OnInit } from '@angular/core';
import {GoogleService} from '../../@shared/services/api/google/google.service';

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

  constructor(private googleService: GoogleService) { }

  ngOnInit() {
    this.refreshUser();
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

  loginGoogle() {
    this.googleService.login().then(r => {
      this.refreshUser();
    });
  }

  logoutGoogle() {
    this.googleService.logout().then(r => {
      this.refreshUser();
    });
  }

  isLogged() {
    return this.googleService.isAuthenticated();
  }
}
