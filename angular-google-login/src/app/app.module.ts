import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Routing
import { AppRoutingModule } from './app-routing-module';

//Toastr
import { ToastrModule } from 'ngx-toastr';

//Social Login
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';

//Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

//Directivas
import { AllCustomDirectives } from './directives/all-custom-directives';

//Bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';

//Services
import { AuthService } from './services/login/auth.service';
import { RegisterService } from './services/register/register.service';

//Components
import { AppComponent } from './app.component';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserRegistrationSuccessComponent } from './components/user-registration-success/user-registration-success.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    LogOutComponent,
    NavigationBarComponent,
    UserRegistrationComponent,
    AboutPageComponent,
    ContactPageComponent,
    NotFoundComponent,
    UserRegistrationSuccessComponent
  ],
  imports: [
    AllCustomDirectives,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    
    ModalModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      //timeOut: 2000, // tiempo de duración del mensaje en milisegundos
      //positionClass: 'toast-top-center', // posición del mensaje
      preventDuplicates: true // evitar que se muestren mensajes duplicados
    }),
    //Angular material
    MatButtonModule,
    MatCardModule,
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
    AuthService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
