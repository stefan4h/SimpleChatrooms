/**
 * Model of a User
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  token?: string;
  profilePicture?: string;
}
