import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import {PageNotFoundComponent} from  './page-not-found/page-not-found.component'

const routes: Routes = [
  { path:'' ,component:HomepageComponent },
  { path:'login' ,component:LoginPageComponent },
  { path:'register' ,component:RegistrationComponent },

  {path:'**' ,component:PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
