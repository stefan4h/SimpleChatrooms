import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {BehaviorSubject, interval, Observable} from "rxjs";
import {Message} from "../models/message.model";
import {environment} from "../../environments/environment";
import {RoomService} from "./room.service";
import {Room} from "../models/room.model";
import {filter, take} from "rxjs/operators";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _messagesForRooms: BehaviorSubject<Map<string, Message[]>>;

  /**
   * return the messages of the behaviour subject as observable
   */
  public get messages$(): Observable<Map<string, Message[]>> {
    return this._messagesForRooms?.asObservable();
  }

  constructor(private http: HttpClient,
              private roomService: RoomService,
              private storageService: StorageService,
              private authService: AuthService) {
    // instantiate the initial messages
    this._messagesForRooms = new BehaviorSubject<Map<string, Message[]>>(new Map<string, Message[]>())

    // this.storageService.get('messages')
    //   .then((messages: Map<string, Message[]>) => {
    //     console.log(messages)
    //     this._messagesForRooms.next(messages);
    //   });

    roomService.rooms$
      .subscribe((rooms: Room[]) => {
        let roomMap: Map<string, Message[]> = this._messagesForRooms.value;

        if (rooms)
          rooms.forEach(room => {
            if (roomMap?.has(room.id)) return;
            if (roomMap)
              roomMap.set(room.id, []);
          });

        this._messagesForRooms.next(roomMap);
      });
  }

  /**
   * Fetch all new messages from the server and do that every 500 milliseconds
   */
  getAll(): void {
    if(this.authService.user == null) return;

    let body = {};
    if (this._messagesForRooms.value)
      this._messagesForRooms.value.forEach((m, k) => body[k] = m.length > 0 ? m[0].id : null);

    this.http.patch<any>(environment.apiURL + `users/${this.authService.user.id}/rooms/08da05e4-99d3-4bd1-8ac9-0eccb7d3d2dd/messages`,
      {roomsWithLastMessageReceived: body}).subscribe(rooms => {
      let roomMap = this._messagesForRooms.value;

      // add new messages to the rooms
      rooms.forEach(kv => {
        if (roomMap && !roomMap.has(kv['key']))
          roomMap.set(kv['key'], kv['value']);
        else if (roomMap)
          roomMap.set(kv['key'], kv['value'].concat(roomMap.get(kv['key'])));
      });

      this._messagesForRooms.next(roomMap);
      this.storageService.set('messages', roomMap);
    })
  }

  addMessageToRoom(message: Message): void {
    let roomMap = this._messagesForRooms.value;

    let messages : Message[] = [message]
    roomMap.set(message.roomId,messages.concat(roomMap.get(message.roomId)));
    this._messagesForRooms.next(roomMap);
    this.storageService.set('messages', roomMap);
  }

  /**
   * Create a new message and send to the server
   * @param roomId
   * @param text
   */
  create(roomId: string, text: string): Observable<Message> {
    return this.http.post<Message>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/messages`, {text});
  }
}
