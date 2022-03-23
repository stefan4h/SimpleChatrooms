import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "../../../../../models/room.model";
import {RoomService} from "../../../../../services/room.service";
import {AuthService} from "../../../../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../../../environments/environment";
import {ToastService} from "../../../../../services/toast.service";

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {

  room$: Observable<Room>;
  environment = environment;

  constructor(private roomService: RoomService,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.room$ = this.roomService.getOne(params.get('roomId')));
  }

  leave(roomId: string) {
    this.roomService.leave(roomId).subscribe(() => {
      this.toastService.success('You left the room');
      this.roomService.getAll();
      this.router.navigate(['']);
    }, error => this.toastService.error('Leaving the room did not work'));
  }

}
