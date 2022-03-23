import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Room} from "../../../../../../models/room.model";
import {RoomService} from "../../../../../../services/room.service";
import {AuthService} from "../../../../../../services/auth/auth.service";
import {ToastService} from "../../../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {AbstractControl, Form, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss'],
})
export class EditRoomComponent implements OnInit {

  editChatroomForm: FormGroup;
  room$: Observable<Room>;
  loading: boolean = false;

  constructor(private roomService: RoomService,
              private authService: AuthService,
              private toastService: ToastService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => this.room$ = this.roomService.getOne(params.get('roomId')));
    this.room$.subscribe((room: Room) => {
      this.editChatroomForm = this.formBuilder.group({
        name: [room.name, Validators.required],
        description: [room.description],
        joinString: [room.joinString, Validators.required]
      });
    });
  }

  edit(roomId: string) {
    this.loading = true;

    this.roomService.edit(roomId, this.name.value, this.description.value, this.joinString.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((room: Room) => {
          this.toastService.success('Chatroom edited successfully!');
          this.roomService.getAll();
          this.router.navigate(['/rooms', room.id, 'details'])
        },
        error => this.toastService.error('Chatroom could not be edited'))
  }

  get name(): AbstractControl {
    return this.editChatroomForm.get('name');
  }

  get description(): AbstractControl {
    return this.editChatroomForm.get('description');
  }

  get joinString(): AbstractControl {
    return this.editChatroomForm.get('joinString');
  }
}
