import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user$: Observable<User>;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

}
