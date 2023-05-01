import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AppUserModel } from 'src/app/models/app-user-model';
import { AuthService } from 'src/app/services/login/auth.service';
import { LoginComponent } from '../login/login.component';
import { LogOutComponent } from '../log-out/log-out.component';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent  implements OnInit {
  constructor(private customAuthServ: AuthService,
              private modalService: BsModalService) { }

  
  appUser: AppUserModel;
  loggedIn: boolean;

  ngOnInit() {
    this.loggedIn = this.customAuthServ.isLoggedIn();
    if(this.loggedIn){
      this.appUser = this.customAuthServ.getLoggedUser();
    }
    this.customAuthServ.isLogged().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.appUser = this.customAuthServ.getLoggedUser();
      } else {
        this.appUser = new AppUserModel();
      }
    });
  }



  modalRef: BsModalRef;

  openLoginModal() {
    this.modalRef = this.modalService.show(LoginComponent);
  }

  openLogoutModal(){
    this.modalRef = this.modalService.show(LogOutComponent);
  }
}
