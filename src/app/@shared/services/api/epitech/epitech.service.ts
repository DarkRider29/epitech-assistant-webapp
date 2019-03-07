import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Intranet} from '../../../models/Intranet';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpitechService {

  constructor(private http: HttpClient) {
  }

  authRequestOptions() {

    const authHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return {headers: authHeaders};
  }

  getUser(email: string): Observable<Intranet> {

    return this.http
      .get<any>(`${environment.epitechAPI}${email}`, this.authRequestOptions());
  }
}
