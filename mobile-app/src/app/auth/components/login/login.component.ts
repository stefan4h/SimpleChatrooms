import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {AuthService} from "../../../services/auth/auth.service";
import {ToastService} from "../../../services/toast.service";

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

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  register() {
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

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
