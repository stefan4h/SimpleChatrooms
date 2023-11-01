import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {environment} from "../../environments/environment";
import {Message} from "../models/message.model";
import {MessageService} from "./message.service";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private hubConnection: signalR.HubConnection;
  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.url + `messagehub`,{accessTokenFactory: () => this.authService.token})
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
    this.addMessageListener();
  }

  public restartConnection = () => {
    this.hubConnection
      .stop()
      .then(() => {
        console.log('Connection stopped');
        this.startConnection();
      })
      .catch(err => console.log('Error while restarting connection: ' + err))
  }

  public addMessageListener = () => {
    this.hubConnection.on('messages', (message: Message) => {
        this.messageService.addMessageToRoom(message);
    });
  }
}
