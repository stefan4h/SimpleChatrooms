import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  user$: Observable<User>

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

}
