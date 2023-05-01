import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/login/auth.service';
import { JwtAuthenticationRequest } from '../../models/jwt-authentication-request';
import { ToastrService } from 'ngx-toastr';
import { AppUserModel } from '../../models/app-user-model';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  private authStateChange$ = new Subject<void>(); //test
  
  constructor(private formBuilder: FormBuilder, 
              private modalRef: BsModalRef, 
              private authService: SocialAuthService,
              private customAuthServ: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
    
    /*this.authService.authState.subscribe((user) => {
      this.user = user;
      this.signInSocialManagement();
    });*/
    this.authService.authState
      .pipe(takeUntil(this.authStateChange$))
      .subscribe((user) => {
        this.user = user;
        this.signInSocialManagement();
    });

    this.customAuthServ.isLogged().subscribe(loggedIn => {
      if (loggedIn) {
        this.loggedIn = loggedIn;
        this.appUser = this.customAuthServ.getLoggedUser();
      } else {
        this.loggedIn = loggedIn;
        this.appUser = null;
      }
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
    this.customAuthServ.doGetSocialUserLogin(this.user).subscribe({
      next: (response) => {
        console.log('Respuesta bien:', response);
        if(response.loggedIn){
          this.loggedIn = true;
          this.appUser = response;
          this.authStateChange$.next();
          this.closeModal();
        }else{
          console.log("social login error");
          this.loggedIn = false;
          this.showToastErrorLogin();
        }
      },
      error: (error) => {
        console.log('social login error:', error);
        this.loggedIn = false;
        this.showToastErrorLogin();
      }
    });
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

  ngOnDestroy() {
    this.authStateChange$.complete();
  }

}
