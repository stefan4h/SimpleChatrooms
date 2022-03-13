import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";
import {ActionSheetController} from "@ionic/angular";
import {PhotoService} from "../../../../services/photo.service";
import {UserService} from "../../../../services/user.service";
import {ToastService} from "../../../../services/toast.service";
import {environment} from "../../../../../environments/environment";
import {error} from "protractor";

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss'],
})
export class ChangeProfilePictureComponent implements OnInit {

  user: User;
  user$: Observable<User>;
  environment = environment;

  constructor(private authService: AuthService,
              private actionSheetController: ActionSheetController,
              private userService: UserService,
              private toastService: ToastService,
              public photoService: PhotoService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
    this.user$.subscribe(user => this.user = user);
  }

  async showProfilePictureActions() {
    let buttons = [{
      text: 'Camera',
      icon: 'camera-outline',
      handler: () => this.setProfilePictureFromCamera()
    }, {
      text: 'Picture',
      icon: 'image-outline',
      handler: () => this.setProfilePictureFromGalerie()
    }];

    // only add remove button if a profile picture exists
    if (this.user?.profilePicture)
      buttons.push({
        text: 'Remove',
        icon: 'close-outline',
        handler: () => this.removeProfilePicture()
      });

    const actionSheet = await this.actionSheetController.create({
      header: 'Profile Picture',
      buttons: buttons
    });

    await actionSheet.present();
  }


  setProfilePictureFromCamera() {
    this.photoService.getPictureFromCamera().then((picture: Blob) => {
      let form: FormData = new FormData();
      form.append('image', picture, 'picture.png');
      this.userService.setProfilePicture(form).subscribe(
        (user: User) => {
          this.toastService.success('Profile picture was updated');
          this.authService.reload();
        },
        error => this.toastService.error('Profile picture could not be changed')
      )
    });
  }

  setProfilePictureFromGalerie() {
    this.photoService.getPictureFromGalerie().then((picture: Blob) => {
      let form: FormData = new FormData();
      form.append('image', picture, 'picture.png');
      this.userService.setProfilePicture(form).subscribe(
        (user: User) => {
          this.toastService.success('Profile picture was updated');
          this.authService.reload();
        },
        error => this.toastService.error('Profile picture could not be changed')
      )
    });
  }

  removeProfilePicture() {
    this.userService.removeProfilePicture().subscribe(
      (user: User) => {
        this.toastService.success('Profile picture was removed');
        this.authService.reload();
      },
      error => this.toastService.error('Profile picture could not be removed')
    );
  }
}
