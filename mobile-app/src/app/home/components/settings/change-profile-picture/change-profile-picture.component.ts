import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.scss'],
})
export class ChangeProfilePictureComponent implements OnInit {

  user$: Observable<User>;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;
  }

}
