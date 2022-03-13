import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  update(firstName: string, lastName: string): Observable<User> {
    return this.http.put<User>(environment.apiURL + `users/${this.authService.user.id}`, {firstName, lastName});
  }

  setProfilePicture(form: FormData): Observable<User> {
    return this.http.post<User>(environment.apiURL + `users/${this.authService.user.id}/set-profile-picture`, form);
  }

  removeProfilePicture(): Observable<User> {
    return this.http.post<User>(environment.apiURL + `users/${this.authService.user.id}/remove-profile-picture`, {});
  }
}
