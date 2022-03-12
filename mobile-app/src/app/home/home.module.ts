import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {SettingsComponent} from "./components/settings/settings.component";
import {ChangeProfilePictureComponent} from "./components/settings/change-profile-picture/change-profile-picture.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    SettingsComponent,
    ChangeProfilePictureComponent
  ]
})
export class HomePageModule {
}
