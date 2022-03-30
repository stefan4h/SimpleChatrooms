import {Pipe, PipeTransform} from '@angular/core';
import {Room} from "../../../models/room.model";
import {Message} from "../../../models/message.model";

@Pipe({
  name: 'orderChatroom',
  pure: false
})
export class OrderChatroomPipe implements PipeTransform {

  transform(rooms: Room[], messages: Map<string, Message[]>): Room[] {
    if(messages.size == 0) return rooms;
    return rooms.sort((a, b) => {
      if (messages.get(a.id)?.length == 0 && messages.get(b.id)?.length == 0)
        return 0;
      if (messages.get(a.id)?.length == 0)
        return 1;
      if (messages.get(b.id)?.length == 0)
        return -1;
      return messages.get(a.id)[0].sendDate >= messages.get(b.id)[0].sendDate ? -1 : 1;
    });
  }

}
