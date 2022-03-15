import {User} from "./user.model";

export interface Room {
  id: string;
  name: string;
  description?: string;
  joinString: string;
  picture: string;
  users: User[];
}
