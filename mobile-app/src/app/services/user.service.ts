import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _users: BehaviorSubject<User[]>;

  /**
   * return the users of the behaviour subject as observable
   */
  public get users$(): Observable<User[]> {
    return this._users.asObservable();
  }

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this._users = new BehaviorSubject<User[]>([]);
  }

  /**
   * Fetch all users and update behaviour subject
   */
  getAll(): void {
    this.http.get<User[]>(environment.apiURL + `users`).subscribe(users => this._users.next(users));
  }

  /**
   * Get one user by id
   * @param id
   */
  getOne(id: string): Observable<User> {
    return this.http.get<User>(environment.apiURL + `users/${id}`);
  }

  /**
   * Update a users name
   * @param firstName
   * @param lastName
   */
  update(firstName: string, lastName: string): Observable<User> {
    return this.http.put<User>(environment.apiURL + `users/${this.authService.user.id}`, {firstName, lastName});
  }

  /**
   * Set the profile picture of a user
   * @param form
   */
  setProfilePicture(form: FormData): Observable<User> {
    return this.http.post<User>(environment.apiURL + `users/${this.authService.user.id}/set-profile-picture`, form);
  }

  /**
   * Remove the profile picture of user
   */
  removeProfilePicture(): Observable<User> {
    return this.http.post<User>(environment.apiURL + `users/${this.authService.user.id}/remove-profile-picture`, {});
  }
}
