import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {User} from "../../../models/user.model";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    this.loading = true;

    this.authService.register(
      this.firstname.value,
      this.lastname.value,
      this.username.value,
      this.password.value
    ).pipe(finalize(() => this.loading = false))
      .subscribe(
        () => this.toastService.success('Account successfully created'),
        error => this.toastService.error('An error occurred while creating the account')
      );
  }

  get firstname(): AbstractControl {
    return this.registerForm.get('firstname');
  }

  get lastname(): AbstractControl {
    return this.registerForm.get('lastname');
  }

  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
}
