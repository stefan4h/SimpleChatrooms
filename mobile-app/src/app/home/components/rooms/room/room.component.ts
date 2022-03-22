import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "../../../../models/room.model";
import {RoomService} from "../../../../services/room.service";
import {AuthService} from "../../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent implements OnInit {

  room$: Observable<Room>;
  environment = environment;

  constructor(private roomService: RoomService,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.room$ = this.roomService.getOne(params.get('roomId')));

  }

}
