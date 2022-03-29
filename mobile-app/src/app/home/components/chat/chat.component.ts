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
import {finalize, map, take, tap} from "rxjs/operators";
import {Message} from "../../../models/message.model";
import {ToastService} from "../../../services/toast.service";
import {Observable, of} from "rxjs";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

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
  users: User[] = []

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService,
              private userService: UserService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.messageFormControl = this.formBuilder.control(null, [Validators.required, this.noWhitespaceValidator]);
    this.messages$ = this.messageService.messages$;

    // scroll to bottom after initial loading of messages
    this.messages$.subscribe(messages => this.messages = messages.get(this.room.id));
    this.scrollToBottom();
    this.userService.getAll();
    this.userService.users$.subscribe(users => this.users = users);
  }

  /**
   * Will trigger the "scrollToBottom" method when the view was checked and there is
   * a different message count (a new message appeared)
   */
  ngAfterViewChecked(): void {
    if (this.messages.length == this.messageCount) return;

    this.messageCount = this.messages.length;
    this.scrollToBottom();
  }

  /**
   * Send message to server
   */
  send() {
    // dont allow to send empty message
    if (this.messageFormControl.invalid) return;

    this.loading = true;
    // save value before clearing the text input
    let text = this.messageFormControl.value;
    this.messageFormControl.setValue(null);

    this.messageService.create(this.room.id, text)
      .pipe(finalize(() => this.loading = false))
      .subscribe((message: Message) => {
        this.scrollToBottom();
      }, error => {
        this.messageFormControl.setValue(text);
        this.toastService.error('An error occurred while sending the message')
      });
  }

  /**
   * Method to scroll to bottom of chat
   */
  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  /**
   * Returns the user of the message, if user left group will be fetched from server
   * @param message
   */
  getMessageUser(message: Message): User {
    // if user is in group simply return the model
    let user = this.room.users.find(u => u.id == message.userId);
    if (user)
      return user;

    return this.users.find(u => u.id == message.userId);
  }

  /**
   * Custom validator to ensure no whitespaces get send as message
   * @param control
   */
  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
  }
}
