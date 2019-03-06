import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as graph from '@microsoft/microsoft-graph-types';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  authRequestOptions() {

    const authHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + this.authService.accessToken());

    return {headers: authHeaders};
  }

  authRequestOptionsPhoto() {

    const authHeaders = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.authService.accessToken());

    return {headers: authHeaders, responseType: 'blob' as 'blob'};
  }

  getUser(): Observable<graph.User> {

    return this.http
      .get<any>('https://graph.microsoft.com/v1.0/me', this.authRequestOptions());
  }

  getUserPhoto() {

    return this.http
      .get('https://graph.microsoft.com/v1.0/me/photo/$value', this.authRequestOptionsPhoto());
  }
}
