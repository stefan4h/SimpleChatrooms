import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "../../../../models/room.model";
import {RoomService} from "../../../../services/room.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {AlertController} from "@ionic/angular";
import {Geolocation} from '@capacitor/geolocation';
import {MessageService} from "../../../../services/message.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  room$: Observable<Room>;
  room: Room;
  environment = environment;

  constructor(private roomService: RoomService,
              private authService: AuthService,
              private altertController: AlertController,
              private messageService: MessageService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.room$ = this.roomService.getOne(params.get('roomId')));

    this.room$.subscribe(room => this.room = room);
  }


  async shareLocation() {
    const alert = await this.altertController.create({
      header: "Do you want to share your Location with this group?",
      buttons: ['Cancel', {
        text: 'Yes',
        handler: async () => {
          const coordinates = await Geolocation.getCurrentPosition();
          this.messageService.create(
            this.room.id, `<a href="https://www.google.com/maps/@?api=1&map_action=map&center=${coordinates.coords.latitude}%${coordinates.coords.longitude}" target="_blank">My Location</a>`
          ).subscribe();
        }
      }]
    });

    await alert.present();
  }
}
