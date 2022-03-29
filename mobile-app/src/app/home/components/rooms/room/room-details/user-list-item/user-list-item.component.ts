import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../../../models/user.model";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {

  @Input() user: User;
  environment = environment;

  constructor() {
  }

  ngOnInit() {
  }

}
