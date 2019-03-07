import { Injectable } from '@angular/core';

declare const hello: any;

@Injectable({
  providedIn: 'root'
})
export class AmazonService {

  constructor() { }

  accessToken(): string {
    const msft = hello('amazon').getAuthResponse();
    const accessToken = msft.access_token;
    return accessToken;
  }

  isAuthenticated(): boolean {
    const session = hello('amazon').getAuthResponse();
    const currentTime = (new Date()).getTime() / 1000;
    return session && session.access_token && session.expires > currentTime;
  }

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      hello('amazon').api('me').then(r => resolve(r), e => reject(e));
    });
  }

  login(): Promise<boolean> {
    return new Promise(((resolve) => {
      hello('amazon').login().then(
        () => {
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
      hello('amazon').logout().then(
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
