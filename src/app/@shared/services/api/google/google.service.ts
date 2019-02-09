import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import * as hello from 'hellojs/dist/hello.all.js';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor() {
  }

  accessToken(): string {
    const msft = hello('google').getAuthResponse();
    const accessToken = msft.access_token;
    return accessToken;
  }

  isAuthenticated(): boolean {
    const session = hello('google').getAuthResponse();
    const currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      hello('google').api('me').then(r => resolve(r), e => reject(e));
    });
  }

  login(): Promise<boolean> {
    return new Promise(((resolve) => {
      hello('google').login().then(
        () => {
          console.log('Connected google !');
          resolve(true);
        },
        e => {
          console.error(e.error.message);
          resolve(false);
        }
      );
    }));
  }

  logout(): Promise<boolean> {
    return new Promise(((resolve) => {
      hello('google').logout().then(
        () => {
          // this.router.navigate(['/']);
          resolve(true);
        },
        e => {
          console.error(e.error.message);
          resolve(false);
        }
      );
    }));
  }
}