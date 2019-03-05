import {Component, OnInit} from '@angular/core';
import {AuthService} from './@shared/services/auth/auth.service';
import * as firebase from 'firebase';

const settings = {timestampsInSnapshots: true};
const config = {
  apiKey: "AIzaSyDTEFYuQxvxGoT9DPTvzuDC1BnfdEJkD8I",
  authDomain: "epitech-b2910.firebaseapp.com",
  databaseURL: "https://epitech-b2910.firebaseio.com",
  projectId: "epitech-b2910",
  storageBucket: "epitech-b2910.appspot.com",
  messagingSenderId: "493942636949"
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'front-epitech-assistant';

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    firebase.initializeApp(config);
    firebase.firestore().settings(settings);
    this.authService.init();
  }
}
