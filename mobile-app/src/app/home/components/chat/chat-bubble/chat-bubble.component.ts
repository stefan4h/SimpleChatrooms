import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../../models/message.model";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user.model";
import {environment} from "../../../../../environments/environment";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent implements OnInit {

  @Input() message: Message;
  @Input() user: User;
  loggedInUser: User;
  environment = environment;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => this.loggedInUser = user);
  }

}
