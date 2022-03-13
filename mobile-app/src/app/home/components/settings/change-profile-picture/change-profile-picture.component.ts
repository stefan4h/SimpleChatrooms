import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../../../services/photo.service";

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss'],
})
export class ChangeProfilePictureComponent implements OnInit {

  user: User;
  user$: Observable<User>;

  constructor(private authService: AuthService,
              private actionSheetController: ActionSheetController,
              private photoService: PhotoService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.user$.subscribe(user => this.user = user);
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
          this.photoService.addNewToGallery()
        }
      }]
    });

    // only add remove button if a profile picture exists
    if (this.user?.profilePicture)
      actionSheet.buttons.push({
        text: 'Remove',
        icon: 'close-outline',
        handler: () => {
          console.log('Delete clicked');
        }
      });

    await actionSheet.present();
  }

}
