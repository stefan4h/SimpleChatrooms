import {Component, ElementRef, Input, OnInit, ViewChildren} from '@angular/core';
import {Room} from "../../../models/room.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";
import {finalize} from "rxjs/operators";
import {Message} from "../../../models/message.model";
import {ToastService} from "../../../services/toast.service";

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
              private messageService: MessageService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.messageFormControl = this.formBuilder.control(null, [Validators.required]);
  }

  send() {
    this.loading = true;
    // save value before clearing the text input
    let text = this.messageFormControl.value;
    this.messageFormControl.setValue(null);

    this.messageService.create(this.room.id, text)
      .pipe(finalize(() => this.loading = false))
      .subscribe((message: Message) => {
        document.getElementById("message-input").focus()
      }, error => {
        this.messageFormControl.setValue(text);
        this.toastService.error('An error occurred while sending the message')
      });
  }
}
