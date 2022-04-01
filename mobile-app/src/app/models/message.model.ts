import {User} from "./user.model";

/**
 * Model of a Message
 */
export interface Message {
  id: string;
  text: string;
  sendDate: Date;
  userId: string;
  user?: User;
  roomId: string;
}
