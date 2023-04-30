import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUserModel } from 'src/app/models/app-user-model';
import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent  implements OnInit {
  constructor(private customAuthServ: AuthService) { }

  
  appUser: AppUserModel;
  loggedIn: boolean;

  ngOnInit() {
    this.loggedIn = this.customAuthServ.isLoggedIn();
    if(this.loggedIn){
      this.appUser = this.customAuthServ.getLoggedUser();
    }
    this.customAuthServ.isLogged().subscribe(loggedIn => {
      if (loggedIn) {
        this.loggedIn = loggedIn;
        this.appUser = this.customAuthServ.getLoggedUser();
      } else {
        this.loggedIn = loggedIn;
        this.appUser = null;
      }
    });
  }

}
