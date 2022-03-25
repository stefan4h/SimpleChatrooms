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
import {RoomsComponent} from "./components/rooms/rooms.component";
import {RoomListItemComponent} from "./components/rooms/room-list-item/room-list-item.component";
import {RoomComponent} from "./components/rooms/room/room.component";
import {RoomDetailsComponent} from "./components/rooms/room/room-details/room-details.component";
import {ChangeRoomPictureComponent} from "./components/rooms/room/room-details/change-room-picture/change-room-picture.component";
import {EditRoomComponent} from "./components/rooms/room/room-details/edit-room/edit-room.component";
import {ChatComponent} from "./components/chat/chat.component";


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
    RoomsComponent,
    RoomListItemComponent,
    RoomComponent,
    RoomDetailsComponent,
    ChangeRoomPictureComponent,
    EditRoomComponent,
    ChatComponent,
  ]
})
export class HomePageModule {
}
