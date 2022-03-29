import {User} from "./user.model";

export interface Message {
  id: string;
  text: string;
  sendDate: Date;
  userId: string;
  user?: User;
  roomId: string;
}
