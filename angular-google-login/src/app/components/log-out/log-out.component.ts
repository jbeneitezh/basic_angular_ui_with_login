import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {
  constructor(public modalRef: BsModalRef,
              public customAuthService :AuthService) {}

  closeModal() {
    this.modalRef.hide();
  }

  logOut() {
    this.customAuthService.logOut();
    this.modalRef.hide();
  }
}
