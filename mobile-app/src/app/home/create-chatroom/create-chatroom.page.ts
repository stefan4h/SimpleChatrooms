import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../services/toast.service";
import {RoomService} from "../../services/room.service";
import {Room} from "../../models/room.model";
import {finalize} from "rxjs/operators";
import {error} from "protractor";

@Component({
  selector: 'app-create-chatroom',
  templateUrl: './create-chatroom.page.html',
  styleUrls: ['./create-chatroom.page.scss'],
})
export class CreateChatroomPage implements OnInit {

  createChatroomFrom: FormGroup;
  loading: boolean = false;
  room: Room = null;

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService,
              private roomService: RoomService) {
  }

  ngOnInit() {
    this.createChatroomFrom = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      joinString: ['', Validators.required]
    });
  }

  create() {
    this.loading = true;

    this.roomService.create(this.name.value, this.description.value, this.joinString.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((room: Room) => {
          this.room = room;
          this.toastService.success('Chatroom created successfully!');
        },
        error => this.toastService.error('Chatroom could not be created'))
  }

  get name(): AbstractControl {
    return this.createChatroomFrom.get('name');
  }

  get description(): AbstractControl {
    return this.createChatroomFrom.get('description');
  }

  get joinString(): AbstractControl {
    return this.createChatroomFrom.get('joinString');
  }
}
