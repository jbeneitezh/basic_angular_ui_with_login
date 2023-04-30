import { SocialAuthService, SocialUser, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/login/auth.service';
import { JwtAuthenticationRequest } from '../models/jwt-authentication-request';
import { ToastrService } from 'ngx-toastr';
import { AppUserModel } from '../models/app-user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  appUser: AppUserModel;
  loggedIn: boolean;
  loginForm: FormGroup;
  authReq: JwtAuthenticationRequest;
  
  constructor(private formBuilder: FormBuilder, 
              private modalRef: BsModalRef, 
              private authService: SocialAuthService,
              private customAuthServ: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signInSocialManagement();
    });
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',
                Validators.compose([
                  Validators.required,
                  Validators.minLength(8), // Mínimo 8 caracteres
                  Validators.maxLength(20), // Máximo 20 caracteres
                  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=]).*$') // Al menos una mayúscula, una minúscula, un número y un carácter especial
                  ])
                ]
    });
  }

  onSubmit() {
    console.log('Email   : ' + this.loginForm.value.email);
    console.log('Password: ' + this.loginForm.value.password);
    this.loginFormSubmit();
  }

  signInSocialManagement(): void {
    
    this.loggedIn = (this.user != null);
    console.log(this.user);
    console.log('entre en token: '+this.user.idToken);
    
  }

  loginFormSubmit(): void{
    console.log('loginFormSubmit');
    this.authReq = new JwtAuthenticationRequest();
    this.authReq.email = this.loginForm.value.email;
    this.authReq.password = this.loginForm.value.password;
    this.customAuthServ.doPostLogin(this.authReq).subscribe(resp=>{
      console.log("responde: "+resp);
      if(resp.loggedIn){
        this.loggedIn = true;
        this.appUser = resp;
        this.closeModal();
      }else{
        console.log("login error");
        this.loggedIn = false;
        this.showToastErrorLogin();
      }
    }); 
  }

  
  public closeModal(): void {
    this.modalRef.hide();
  }

  showToastErrorLogin() {
    this.toastr.error('Login error', 'Error en login');
  }

}
