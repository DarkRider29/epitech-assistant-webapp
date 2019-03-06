import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {OfficeService} from '../api/office365/office.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  email: string;
  googleLinked: boolean;
  amazonLinked: boolean;

  constructor(private firestore: AngularFirestore, private officeService: OfficeService) {
    this.officeService.getUser().toPromise().then(e => {
      this.email = e.mail;
      this.firestore.collection('users', ref => ref.where('email', '==', this.email).
        where('type', '==', 'google')
      ).get().toPromise().then(data => {
        this.googleLinked = !data.empty;
      });
      this.firestore.collection('users', ref => ref.where('email', '==', this.email).
        where('type', '==', 'amazon')
      ).get().toPromise().then(data => {
        this.amazonLinked = !data.empty;
      });
    });
  }

  createUser(id: string, type: string) {
    return this.firestore.collection('users').doc(id).set({
      'connected': true,
      'email': this.email,
      'type': type
    }).then((u => {
      if (type === 'google') {
        this.googleLinked = true;
      } else if (type === 'amazon') {
        this.amazonLinked = true;
      }
    }));
  }

  isGoogleLinked(): boolean {
    return this.googleLinked;
  }

  isAmazonLinked(): boolean {
    return this.amazonLinked;
  }

  deleteAccount(type: string) {
    this.firestore.collection('users', ref => ref.where('email', '==', this.email).
    where('type', '==', type)).get().toPromise().then(d => {
      d.forEach(e => {
        this.firestore.collection('users').doc(e.id).delete();
      });
      this.googleLinked = false;
    });
  }
}
