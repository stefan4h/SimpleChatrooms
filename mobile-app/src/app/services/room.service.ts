import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {Observable} from "rxjs";
import {Room} from "../models/room.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  create(name: string, description: string, joinString: string): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms`, {
      name,
      description,
      joinString
    });
  }
}
