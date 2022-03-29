import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Room} from "../../../models/room.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MessageService} from "../../../services/message.service";
import {finalize, take} from "rxjs/operators";
import {Message} from "../../../models/message.model";
import {ToastService} from "../../../services/toast.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @Input() room: Room;
  messages$: Observable<Map<string, Message[]>>;
  messageFormControl: FormControl;
  loading: boolean = false;
  messageCount: number = 0;
  messages: Message[] = [];

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.messageFormControl = this.formBuilder.control(null, [Validators.required]);
    this.messages$ = this.messageService.messages$;

    // scroll to bottom after initial loading of messages
    this.messages$.subscribe(messages => this.messages = messages.get(this.room.id));
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    if (this.messages.length == this.messageCount) return;

    this.messageCount = this.messages.length;
    this.scrollToBottom();
  }

  send() {
    // dont allow to send empty message
    if (this.messageFormControl.value == '') return;

    this.loading = true;
    // save value before clearing the text input
    let text = this.messageFormControl.value;
    this.messageFormControl.setValue(null);

    this.messageService.create(this.room.id, text)
      .pipe(finalize(() => this.loading = false))
      .subscribe((message: Message) => {
        document.getElementById("message-input").focus();
        this.scrollToBottom();
      }, error => {
        this.messageFormControl.setValue(text);
        this.toastService.error('An error occurred while sending the message')
      });
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
