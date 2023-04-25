import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder, 
              private modalRef: BsModalRef, 
              private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user)
    });
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Email: ' + this.loginForm.value.email);
    console.log('Password: ' + this.loginForm.value.password);
    this.modalRef.hide();
  }

  public closeModal(): void {
    this.modalRef.hide();
  }
}
