import {Component, OnInit} from '@angular/core';
import {OfficeService} from '../../@shared/services/api/office365/office.service';
import {stringify} from 'querystring';
import {Buffer} from 'buffer';
import {DomSanitizer} from '@angular/platform-browser';
import * as util from 'util';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['../styles/cards.scss', './office.component.scss']
})
export class OfficeComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  imageToShow: any;

  constructor(private officeService: OfficeService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.officeService.getUser().toPromise().then((r) => {
      console.log(r);
      this.firstName = r.givenName;
      this.lastName = r.surname;
      this.email = r.mail;
    });


    this.officeService.getUserPhoto().toPromise().then((r) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.imageToShow = reader.result;
        this.imageToShow = this.sanitizer.bypassSecurityTrustUrl(this.imageToShow);
      }, false);

      if (r) {
        reader.readAsDataURL(r);
      }
    });
  }
}
