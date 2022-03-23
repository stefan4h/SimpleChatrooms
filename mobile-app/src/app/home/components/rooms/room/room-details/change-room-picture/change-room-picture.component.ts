import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../../../../models/room.model";
import {environment} from "../../../../../../../environments/environment";
import {ActionSheetController} from "@ionic/angular";
import {User} from "../../../../../../models/user.model";
import {RoomService} from "../../../../../../services/room.service";
import {PhotoService} from "../../../../../../services/photo.service";
import {ToastService} from "../../../../../../services/toast.service";

@Component({
  selector: 'app-change-room-picture',
  templateUrl: './change-room-picture.component.html',
  styleUrls: ['./change-room-picture.component.scss'],
})
export class ChangeRoomPictureComponent implements OnInit {

  @Input() room: Room;
  environment = environment;

  constructor(
    private roomService: RoomService,
    private photoService: PhotoService,
    private toastService: ToastService,
    private actionSheetController: ActionSheetController) {
  }

  ngOnInit() {
  }

  async showPictureActions() {
    let buttons = [{
      text: 'Camera',
      icon: 'camera-outline',
      handler: () => this.setPictureFromCamera()
    }, {
      text: 'Picture',
      icon: 'image-outline',
      handler: () => this.setPictureFromGalerie()
    }];

    // only add remove button if a profile picture exists
    if (this.room?.picture)
      buttons.push({
        text: 'Remove',
        icon: 'close-outline',
        handler: () => this.removePicture()
      });

    const actionSheet = await this.actionSheetController.create({
      header: 'Change Picture',
      buttons: buttons
    });

    await actionSheet.present();
  }

  setPictureFromCamera() {
    this.photoService.getPictureFromCamera().then((picture: Blob) => {
      let form: FormData = new FormData();
      form.append('image', picture, 'picture.png');
      this.roomService.setPicture(this.room.id, form).subscribe(
        (room: Room) => {
          this.toastService.success('Picture was updated');
          this.room = room;
          this.roomService.getAll();
        },
        error => this.toastService.error('Picture could not be changed')
      )
    });
  }

  setPictureFromGalerie() {
    this.photoService.getPictureFromGalerie().then((picture: Blob) => {
      let form: FormData = new FormData();
      form.append('image', picture, 'picture.png');
      this.roomService.setPicture(this.room.id, form).subscribe(
        (room: Room) => {
          this.toastService.success('Picture was updated');
          this.room = room;
          this.roomService.getAll();
        },
        error => this.toastService.error('Picture could not be changed')
      )
    });
  }

  removePicture() {
    this.roomService.removePicture(this.room.id).subscribe(
      (room: Room) => {
        this.toastService.success('Picture was removed');
        this.room = room;
        this.roomService.getAll();
      },
      error => this.toastService.error('Picture could not be removed')
    );
  }
}
