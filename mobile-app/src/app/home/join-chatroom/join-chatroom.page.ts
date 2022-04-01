import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../services/room.service";
import {Room} from "../../models/room.model";

/**
 * JoinChatroomPage shows search bar and list of found rooms
 */
@Component({
  selector: 'app-join-chatroom',
  templateUrl: './join-chatroom.page.html',
  styleUrls: ['./join-chatroom.page.scss'],
})
export class JoinChatroomPage implements OnInit {

  rooms: Room[];

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {
  }

  /**
   * Searches for a chatroom
   * @param e
   */
  search(e: CustomEvent) {
    const q: string = e.detail.value;
    if (q)
      this.roomService.find(e.detail.value).subscribe(rooms => this.rooms = rooms);
    else
      this.rooms = [];
  }
}
