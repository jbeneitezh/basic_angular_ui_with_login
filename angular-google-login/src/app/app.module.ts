import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // importa BrowserAnimationsModule
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';

//Toastr
import { ToastrModule } from 'ngx-toastr';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

//Services
import { AuthService } from './services/login/auth.service';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationBarComponent,
    LogOutComponent,
    UserRegistrationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000, // tiempo de duración del mensaje en milisegundos
      positionClass: 'toast-top-right', // posición del mensaje
      preventDuplicates: true // evitar que se muestren mensajes duplicados
    }),
    //Angular material
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              //'663990587528-hmu2scpu3t5m3eablhkmb62uq57r1i8c.apps.googleusercontent.com'
              //'340230854800-shovlqo83mb5atlcgjco37nijjg08lpa.apps.googleusercontent.com'
              '340230854800-5u5e7jlj2s6g1jvdsgj2vnbtun4j7f0l.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
