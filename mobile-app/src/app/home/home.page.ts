import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {MessageService} from "../services/message.service";
import {RoomService} from "../services/room.service";
import {UserService} from "../services/user.service";
import {SignalrService} from "../services/signalr.service";

/**
 * Home page component, entry point of the home page
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user$: Observable<User>;
  environment = environment;

  constructor(public authService: AuthService,
              private roomService: RoomService,
              private userService: UserService,
              private messageService: MessageService,
              private signalRService: SignalrService) {
    this.authService.user$.subscribe(user => user ? this.userService.getAll() : null);
  }

  /**
   * Initializes the observables needed and starts polling the messages
   */
  ngOnInit(): void {
    this.user$ = this.authService.user$;

    setTimeout(() => {
      this.messageService.getAll();
    }, 500);

    setTimeout(() => {
      this.signalRService.startConnection();
    }, 1000);

    setTimeout(() => {
      this.messageService.getAll();
    }, 1500);
  }

}
