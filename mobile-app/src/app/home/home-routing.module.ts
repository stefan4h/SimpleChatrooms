import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {SettingsComponent} from "./components/settings/settings.component";
import {RoomComponent} from "./components/rooms/room/room.component";
import {RoomDetailsComponent} from "./components/rooms/room/room-details/room-details.component";
import {EditRoomComponent} from "./components/rooms/room/room-details/edit-room/edit-room.component";

const routes: Routes = [
  {path: '', component: HomePage},
  {
    path: 'rooms', children: [
      {path: ':roomId', component: RoomComponent},
      {path: ':roomId/details', component: RoomDetailsComponent},
      {path: ':roomId/edit', component: EditRoomComponent},
    ]
  },
  {path: 'settings', component: SettingsComponent},
  {
    path: 'create-chatroom',
    loadChildren: () => import('./create-chatroom/create-chatroom.module').then(m => m.CreateChatroomPageModule)
  },
  {
    path: 'join-chatroom',
    loadChildren: () => import('./join-chatroom/join-chatroom.module').then( m => m.JoinChatroomPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
