import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AuthPageRoutingModule} from './auth-routing.module';

import {AuthPage} from './auth.page';
import {StartComponent} from './components/start/start.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AppModule} from "../app.module";
import {BtnLoadingDirective} from "../shared/directives/btn-loading.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    BtnLoadingDirective
  ],
  declarations: [
    AuthPage,
    StartComponent,
    LoginComponent,
    RegisterComponent,
    BtnLoadingDirective
  ]
})
export class AuthPageModule {
}
