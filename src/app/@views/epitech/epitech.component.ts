import {Component, OnInit} from '@angular/core';
import {EpitechService} from '../../@shared/services/api/epitech/epitech.service';
import {OfficeService} from '../../@shared/services/api/office365/office.service';

@Component({
  selector: 'app-epitech',
  templateUrl: './epitech.component.html',
  styleUrls: ['../styles/cards.scss', './epitech.component.scss']
})
export class EpitechComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  imageToShow: string;
  location: string;
  promo: string;
  courses: string;

  constructor(private epitechService: EpitechService, private officeService: OfficeService) {
  }

  ngOnInit() {

    this.officeService.getUser().toPromise().then((u) => {
      this.epitechService.getUser(u.mail).subscribe((r) => {
        this.firstName = r.firstname;
        this.lastName = r.lastname;
        this.email = r.internal_email;
        this.imageToShow = r.picture;
        this.location = r.location;
        this.promo = r.promo;
        this.courses = r.course_code;
      });
    }).catch((e) => {
      console.error(e);
    });
  }

}
