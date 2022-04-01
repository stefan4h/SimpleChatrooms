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

  /**
   * return the rooms of the behaviour subject as observable
   */
  public get rooms$(): Observable<Room[]> {
    return this._rooms.asObservable();
  }

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this._rooms = new BehaviorSubject<Room[]>([]);
  }

  /**
   * Fetch all rooms and update behaviour subject
   */
  getAll(): void {
    this.http.get<Room[]>(environment.apiURL + `users/${this.authService.user.id}/rooms`).subscribe((rooms: Room[]) => this._rooms.next(rooms));
  }

  /**
   * Get one room by id
   * @param roomId
   */
  getOne(roomId: string): Observable<Room> {
    return this.http.get<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}`);
  }

  /**
   * find a room by joinString or name
   * @param q
   */
  find(q: string): Observable<Room[]> {
    return this.http.get<Room[]>(environment.apiURL + `users/${this.authService.user.id}/rooms/find?q=${q}`);
  }

  /**
   * Create a room
   * @param name
   * @param description
   * @param joinString
   */
  create(name: string, description: string, joinString: string): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms`, {
      name,
      description,
      joinString
    });
  }

  /**
   * Edit an already created room
   * @param roomId
   * @param name
   * @param description
   * @param joinString
   */
  edit(roomId: string, name: string, description: string, joinString: string): Observable<Room> {
    return this.http.put<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}`, {
      name,
      description,
      joinString
    });
  }

  /**
   * Join a room
   * @param roomId
   */
  join(roomId: string): Observable<Room> {
    return this.http.patch<any>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/join`, {});
  }

  /**
   * Leave a room
   * @param roomId
   */
  leave(roomId: string): Observable<Room> {
    return this.http.patch<any>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/leave`, {});
  }

  /**
   * Set a picture for a room
   * @param roomId
   * @param form
   */
  setPicture(roomId: string, form: FormData): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/set-profile-picture`, form);
  }

  /**
   * Remove the picture of a room
   * @param roomId
   */
  removePicture(roomId: string): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/remove-profile-picture`, {});
  }
}
