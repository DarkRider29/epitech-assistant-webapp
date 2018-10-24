import {Injectable, NgZone} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import * as hello from 'hellojs/dist/hello.all.js';
import * as M from 'materialize-css';
import {environment} from '../../environments/environment';
import * as graph from '@microsoft/microsoft-graph-types';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {

  graphUrl: 'https://graph.microsoft.com/v1.0';

  constructor(
    private router: Router,
    private zone: NgZone,
    private http: HttpClient,
  ) {
  }

  initAuthOffice() {
    hello.init({
        msft: {
          id: environment.azureApp,
          oauth: {
            version: 2,
            auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
          },
          scope_delim: ' ',
          form: false
        },
      },
      {redirect_uri: '/dashboard'}
    );
  }

  public isAuthenticated(): boolean {
    const session = hello('msft').getAuthResponse();
    const currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      const msft = hello('msft').getAuthResponse();
      if (msft) {
        resolve(msft);
      } else {
        reject('No user logged in');
      }
    });
  }

  accessToken(): string {
    const msft = hello('msft').getAuthResponse();
    const accessToken = msft.access_token;
    return accessToken;
  }

  authRequestOptions() {

    const authHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.accessToken());

    return { headers: authHeaders };
  }

  getUser(): Observable<graph.User> {

    return this.http
      .get<any>('https://graph.microsoft.com/v1.0/me', this.authRequestOptions());
  }

  callIntra() {
    this.http
      .get<any>('intra/?format=json', this.authRequestOptions()).subscribe((data => {
        console.error(data);
    }));
  }

  login() {
    hello('msft').login({scope: 'User.Read'}).then(
      () => {
        this.zone.run(() => {
          this.router.navigate(['/dashboard']);
          M.toast({html: 'Vous etes maintenant connecté à Office 365 !'});
        });
      },
      e => {
        console.error(e.error.message);
        M.toast({html: 'Une erreur est survenue lors de la connexion !'});
      }
    );
  }

  logout() {
    hello('msft').logout().then(
      () => {
        this.zone.run(() => {
          this.router.navigate(['/login']);
          M.toast({html: 'Vous vous etes deconnecté de office 365.'});
        });
      },
      e => console.error(e.error.message)
    );
  }
}
