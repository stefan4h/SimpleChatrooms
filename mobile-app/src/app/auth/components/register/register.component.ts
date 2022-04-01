import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {ToastService} from "../../../services/toast.service";

/**
 * The register component shows the register form and button
 */
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

  /**
   * initializes the registerForm
   */
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * sends the register request to the server
   */
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

  /**
   * Getter for firstname
   */
  get firstname(): AbstractControl {
    return this.registerForm.get('firstname');
  }

  /**
   * Getter for lastname
   */
  get lastname(): AbstractControl {
    return this.registerForm.get('lastname');
  }

  /**
   * Getter for username
   */
  get username(): AbstractControl {
    return this.registerForm.get('username');
  }

  /**
   * Getter for password
   */
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }
}
