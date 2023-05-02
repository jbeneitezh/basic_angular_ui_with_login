import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUserModel } from '../../models/app-user-model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { UserRegistrationSuccessComponent } from '../user-registration-success/user-registration-success.component';
import { RegisterService } from 'src/app/services/register/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  regForm: FormGroup;
  appUser: AppUserModel;

  constructor(private formBuilder: FormBuilder,
              private modalRef: BsModalRef,
              private modalService: BsModalService,
              private regService: RegisterService,
              private toastr: ToastrService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=]).*$',
          ),
        ]),
      ],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmitRegister() {
    if (this.regForm.valid) {
      this.appUser = new AppUserModel();
      this.appUser.email = this.regForm.value.email;
      this.appUser.password = this.regForm.value.password;
      this.appUser.username = this.regForm.value.username;
      this.appUser.firstName = this.regForm.value.firstName;
      this.appUser.lastName = this.regForm.value.lastName;

      console.log('AppUserModel:', this.appUser);
      this.registerUser();
    } else {
      console.log('Formulario no válido');
    }
  }

  private registerUser() {
    this.regService.createUser(this.appUser).subscribe(
      (userResp: AppUserModel) => {
        if(userResp.id !== null && userResp.id !== undefined){
          console.log('Success registration:', userResp);
          this.openRegistrationSuccess();
        }else{
          console.log('Unknown error.');
          this.toastr.error('Anything was wrong. Please, try later.', 'Error',
                            {
                              closeButton: true, 
                              progressBar: true, 
                              timeOut: 4000, 
                              extendedTimeOut: 3000, 
                              positionClass: 'toast-top-center', 
                            }
                           );
        }
      },
      (error) => {
        console.error('Erorr while creating user: ', error.error);
        this.toastr.error(error.error, 'Error',
        {
          closeButton: true, 
          progressBar: true, 
          timeOut: 6000, 
          extendedTimeOut: 3000, 
          positionClass: 'toast-top-center', 
        }
       );
      }
    );
  }

  public openLoginModal(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(LoginComponent);
  }

  public openRegistrationSuccess(): void{
    this.closeModal();
    this.modalRef = this.modalService.show(UserRegistrationSuccessComponent);
  }

  public closeModal(): void {
    this.modalRef.hide();
  }
}
