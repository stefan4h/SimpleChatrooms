import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthPage} from './auth.page';
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {BtnLoadingDirective} from "../shared/directives/btn-loading.directive";

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {path: '', component: StartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule {
}
