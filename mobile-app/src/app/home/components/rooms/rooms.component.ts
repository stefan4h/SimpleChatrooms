import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../../services/room.service";
import {Observable} from "rxjs";
import {Room} from "../../../models/room.model";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-rooms',
  template: `<app-room-list-item *ngFor="let room of rooms$|async" [room]="room"
                                 [routerLink]="['/rooms',room.id]"></app-room-list-item>`,
})
export class RoomsComponent implements OnInit {

  rooms$: Observable<Room[]>;

  constructor(private roomService: RoomService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.rooms$ = this.roomService.rooms$;
    //fetch rooms as soon as user is fetched from local db
    this.authService.user$.subscribe(user => user ? this.roomService.getAll() : null);
  }

}
