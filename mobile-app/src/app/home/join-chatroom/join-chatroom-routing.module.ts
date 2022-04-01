import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinChatroomPage } from './join-chatroom.page';

/**
 * Declares the routes of the JoinChatroomModule
 */
const routes: Routes = [
  {
    path: '',
    component: JoinChatroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinChatroomPageRoutingModule {}
