import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import * as graph from '@microsoft/microsoft-graph-types';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  me: graph.User;
  errorMessage: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.getUser();
    this.authService.callIntra();
  }

  logout() {
    this.authService.logout();
  }

  getUser() {
    this.authService.getUser()
      .subscribe(data => {
          this.me = data;
          console.error(data);
        },
        error => this.errorMessage = <any>error);
  }
}
