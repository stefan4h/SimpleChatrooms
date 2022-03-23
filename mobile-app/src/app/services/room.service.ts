import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Room} from "../models/room.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private _rooms: BehaviorSubject<Room[]>;

  public get rooms$(): Observable<Room[]> {
    return this._rooms.asObservable();
  }

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this._rooms = new BehaviorSubject<Room[]>([]);
  }

  getAll(): void {
    this.http.get<Room[]>(environment.apiURL + `users/${this.authService.user.id}/rooms`).subscribe((rooms: Room[]) => this._rooms.next(rooms));
  }

  getOne(roomId: string): Observable<Room> {
    return this.http.get<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}`);
  }

  find(q: string): Observable<Room[]> {
    return this.http.get<Room[]>(environment.apiURL + `users/${this.authService.user.id}/rooms/find?q=${q}`);
  }

  create(name: string, description: string, joinString: string): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms`, {
      name,
      description,
      joinString
    });
  }

  edit(roomId: string, name: string, description: string, joinString: string): Observable<Room> {
    return this.http.put<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}`, {
      name,
      description,
      joinString
    });
  }

  join(roomId: string): Observable<Room> {
    return this.http.patch<any>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/join`, {});
  }

  leave(roomId: string): Observable<Room> {
    return this.http.patch<any>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/leave`, {});
  }

  setPicture(roomId: string, form: FormData): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/set-profile-picture`, form);
  }

  removePicture(roomId: string): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/remove-profile-picture`, {});
  }
}
