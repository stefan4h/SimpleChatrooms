import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../../../models/user.model";
import {AuthService} from "../../../../services/auth/auth.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {finalize} from "rxjs/operators";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.scss'],
})
export class ChangeNameComponent implements OnInit {

  user$: Observable<User>;
  editModalOpen: boolean = false;
  editNameForm: FormGroup;
  loading: boolean = false;

  constructor(private authService: AuthService,
              private userService: UserService,
              private toastService: ToastService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.user$ = this.authService.user$;

    this.user$.subscribe((user: User) => {
      this.editNameForm = this.formBuilder.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required]
      });
    })
  }

  edit() {
    this.loading = true;

    this.userService.update(this.firstName.value, this.lastName.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(
        (user: User) => {
          this.toastService.success('The name was updated');
          this.authService.reload();
          this.editModalOpen = false;
        }, error => this.toastService.error('The name could not be updated'));
  }

  get firstName(): AbstractControl {
    return this.editNameForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.editNameForm.get('lastName');
  }
}
