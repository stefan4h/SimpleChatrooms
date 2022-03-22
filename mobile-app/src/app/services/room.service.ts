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

  create(name: string, description: string, joinString: string): Observable<Room> {
    return this.http.post<Room>(environment.apiURL + `users/${this.authService.user.id}/rooms`, {
      name,
      description,
      joinString
    });
  }
}