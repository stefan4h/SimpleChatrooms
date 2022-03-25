import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {Observable} from "rxjs";
import {Message} from "../models/message.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  create(roomId: string, text: string): Observable<Message> {
    return this.http.post<Message>(environment.apiURL + `users/${this.authService.user.id}/rooms/${roomId}/messages`, {text});
  }
}
