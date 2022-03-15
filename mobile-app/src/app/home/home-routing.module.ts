import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home.page';
import {SettingsComponent} from "./components/settings/settings.component";

const routes: Routes = [
  {path: '', component: HomePage,},
  {path: 'settings', component: SettingsComponent},
  {
    path: 'create-chatroom',
    loadChildren: () => import('./create-chatroom/create-chatroom.module').then( m => m.CreateChatroomPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {
}
