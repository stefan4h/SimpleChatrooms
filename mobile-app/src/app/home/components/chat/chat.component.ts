import {Component, Input, OnInit} from '@angular/core';
import {Room} from "../../../models/room.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  @Input() room: Room;
  messageFormControl: FormControl;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.messageFormControl = this.formBuilder.control('', [Validators.required]);
  }

  send() {

  }
}
