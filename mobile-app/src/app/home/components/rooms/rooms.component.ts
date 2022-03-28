import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../../services/room.service";
import {Observable} from "rxjs";
import {Room} from "../../../models/room.model";
import {AuthService} from "../../../services/auth/auth.service";
import {Message} from "../../../models/message.model";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-rooms',
  template: `
    <div *ngIf="messages$ | async as messages">
      <app-room-list-item *ngFor="let room of rooms$|async" [room]="room"
                          [routerLink]="['/rooms',room.id]" [messages]="messages.get(room.id)"></app-room-list-item>
    </div>`,
})
export class RoomsComponent implements OnInit {

  rooms$: Observable<Room[]>;
  messages$: Observable<Map<string, Message[]>>;

  constructor(private roomService: RoomService,
              private messageService: MessageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.rooms$ = this.roomService.rooms$;
    this.messages$ = this.messageService.messages$;
    //fetch rooms as soon as user is fetched from local db
    this.authService.user$.subscribe(user => user ? this.roomService.getAll() : null);
  }

}
