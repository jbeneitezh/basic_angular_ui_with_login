
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactPageComponent } from './components/contact-page/contact-page.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
    { path: ''        , component: HomePageComponent        },
    { path: 'about'   , component: AboutPageComponent       },
    { path: 'contact' , component: ContactPageComponent     },
    { path: '**'      , component: NotFoundComponent        }
  ];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
