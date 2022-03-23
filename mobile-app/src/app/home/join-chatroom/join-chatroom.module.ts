import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinChatroomPageRoutingModule } from './join-chatroom-routing.module';

import { JoinChatroomPage } from './join-chatroom.page';
import {JoinRoomListItemComponent} from "./components/join-room-list-item/join-room-list-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinChatroomPageRoutingModule
  ],
  declarations: [
    JoinChatroomPage,
    JoinRoomListItemComponent
  ]
})
export class JoinChatroomPageModule {}
