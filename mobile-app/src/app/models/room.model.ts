import {User} from "./user.model";

/**
 * Model of a Room
 */
export interface Room {
  id: string;
  name: string;
  description?: string;
  joinString: string;
  picture: string;
  users: User[];
}
