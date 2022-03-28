import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Room} from "../../../../models/room.model";
import {environment} from "../../../../../environments/environment";
import {Message} from "../../../../models/message.model";

@Component({
  selector: 'app-room-list-item',
  templateUrl: './room-list-item.component.html',
  styleUrls: ['./room-list-item.component.scss'],
})
export class RoomListItemComponent implements OnInit,OnChanges {

  @Input() room: Room;
  @Input() messages: Message[];
  environment = environment;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = changes.messages.currentValue;
  }

}
