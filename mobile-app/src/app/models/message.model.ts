import {User} from "./user.model";

export interface Message {
  id: string;
  text: string;
  sendDate: Date;
  user: User;
  roomId: string;
}
