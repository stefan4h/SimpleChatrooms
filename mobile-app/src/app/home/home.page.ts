import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {MessageService} from "../services/message.service";
import {RoomService} from "../services/room.service";
import {Room} from "../models/room.model";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user$: Observable<User>;
  environment = environment;

  constructor(public authService: AuthService,
              private roomService:RoomService,
              private messageService:MessageService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
      this.messageService.getAll();
  }

}
