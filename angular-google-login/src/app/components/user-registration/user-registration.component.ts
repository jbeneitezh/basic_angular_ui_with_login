import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUserModel } from '../../models/app-user-model';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class UserRegistrationComponent implements OnInit {
  regForm: FormGroup;
  appUser: AppUserModel;

  constructor(private formBuilder: FormBuilder) {}

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

  onSubmit() {
    if (this.regForm.valid) {
      this.appUser = new AppUserModel();
      this.appUser.email = this.regForm.value.email;
      this.appUser.password = this.regForm.value.password;
      this.appUser.username = this.regForm.value.username;
      this.appUser.firstName = this.regForm.value.firstName;
      this.appUser.lastName = this.regForm.value.lastName;

      console.log('AppUserModel:', this.appUser);
      // Realiza acciones con el modelo de datos, como enviarlo al servidor para registrarse
    } else {
      console.log('Formulario no válido');
    }
  }
}
