import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateChatroomPageRoutingModule } from './create-chatroom-routing.module';

import { CreateChatroomPage } from './create-chatroom.page';
import {AuthPageModule} from "../../auth/auth.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateChatroomPageRoutingModule,
    ReactiveFormsModule,
    AuthPageModule
  ],
  declarations: [CreateChatroomPage]
})
export class CreateChatroomPageModule {}
