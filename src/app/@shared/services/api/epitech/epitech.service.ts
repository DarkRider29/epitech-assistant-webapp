import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Intranet} from '../../../models/Intranet';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpitechService {

  autologin: string;

  constructor(private http: HttpClient) {
    this.autologin = 'auth-f3a046cf95582c789ed7a77d56c95c7752001371';
  }

  authRequestOptions() {

    const authHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return {headers: authHeaders};
  }

  getUser(): Observable<Intranet> {

    return this.http
      .get<any>(`${environment.epitechAPI}${this.autologin}/user/?format=json`, this.authRequestOptions());
  }
}
