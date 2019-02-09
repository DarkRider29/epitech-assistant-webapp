import {Component, OnInit} from '@angular/core';
import {AmazonService} from '../../@shared/services/api/amazon/amazon.service';

@Component({
  selector: 'app-amazon',
  templateUrl: './amazon.component.html',
  styleUrls: ['../styles/cards.scss', './amazon.component.scss']
})
export class AmazonComponent implements OnInit {

  firstName: string;
  lastName: string;
  nickName: string;
  imageToShow: string;

  constructor(private amazonService: AmazonService) {
  }

  ngOnInit() {
    this.refreshUser();
  }

  refreshUser() {
    if (this.amazonService.isAuthenticated()) {
      this.amazonService.getUser().then((r => {
        /*this.firstName = r.first_name;
        this.lastName = r.last_name;
        this.nickName = r.nickname;
        this.imageToShow = r.thumbnail;*/
      }));
    } else {
      this.imageToShow = '';
    }
  }

  loginAmazon() {
    this.amazonService.login().then(r => {
      this.refreshUser();
    });
  }

  logoutAmazon() {
    this.amazonService.logout().then(r => {
      this.refreshUser();
    });
  }

  isLogged() {
    return this.amazonService.isAuthenticated();
  }
}
