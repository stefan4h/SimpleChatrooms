import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {SettingsComponent} from "./components/settings/settings.component";
import {ChangeProfilePictureComponent} from "./components/settings/change-profile-picture/change-profile-picture.component";
import {ChangeNameComponent} from "./components/settings/change-name/change-name.component";
import {AuthPageModule} from "../auth/auth.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    AuthPageModule,
  ],
  declarations: [
    HomePage,
    SettingsComponent,
    ChangeProfilePictureComponent,
    ChangeNameComponent,
  ]
})
export class HomePageModule {
}
