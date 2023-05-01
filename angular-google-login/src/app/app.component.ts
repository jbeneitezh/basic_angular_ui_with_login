
import { Component } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openLoginModal() {
    this.modalRef = this.modalService.show(LoginComponent);
  }
  
  
}
