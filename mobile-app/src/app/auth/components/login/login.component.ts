import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastService} from "../../../services/toast.service";

/**
 * Login components displays the login form and button
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService:ToastService) {
  }

  /**
   * Initializes the login form
   */
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  /**
   * sends the login request to the server
   */
  login() {
    this.loading = true;

    this.authService.login(
      this.username.value,
      this.password.value
    ).pipe(finalize(() => this.loading = false))
      .subscribe(
        () => this.toastService.success('Welcome back!'),
        error => this.toastService.error('An error occurred while logging in')
      );
  }

  /**
   * Getter for username
   */
  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  /**
   * Getter for password
   */
  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
