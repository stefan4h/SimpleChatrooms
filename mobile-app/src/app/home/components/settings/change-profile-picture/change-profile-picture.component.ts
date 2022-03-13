import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss'],
})
export class ChangeProfilePictureComponent implements OnInit {

  user$: Observable<User>;

  constructor(private authService: AuthService,
              private actionSheetController: ActionSheetController) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

  async showProfilePictureActions() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profile Picture',
      buttons: [{
        text: 'Camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Camera clicked');
        }
      }, {
        text: 'Picture',
        icon: 'image-outline',
        handler: () => {
          console.log('Picture clicked');
        }
      }, {
        text: 'Remove',
        icon: 'close-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
