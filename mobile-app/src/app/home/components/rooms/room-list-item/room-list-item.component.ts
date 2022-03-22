import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../../models/room.model";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss'],
})
export class RoomListItemComponent implements OnInit {

  @Input() room: Room;
  environment = environment;

  constructor() {
  }

  ngOnInit() {
  }

}
