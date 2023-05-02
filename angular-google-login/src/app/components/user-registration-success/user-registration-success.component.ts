import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-user-registration-success',
  templateUrl: './user-registration-success.component.html',
  styleUrls: ['./user-registration-success.component.scss']
})
export class UserRegistrationSuccessComponent {
  constructor(private modalRef: BsModalRef,
              private modalService: BsModalService) {}
  

  public openLoginModal():void{
    this.closeModal();
    this.modalService.show(LoginComponent);
  }
  
  public closeModal():void{
    this.modalRef.hide();
  }
}
