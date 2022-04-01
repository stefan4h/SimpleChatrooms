import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user.model";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {StorageService} from "../storage.service";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: BehaviorSubject<User>;

  /**
   * Return the user behaviour subject as observable
   */
  public get user$(): Observable<User> {
    return this._user.asObservable();
  }

  /**
   * Return the user behaviour subject as user model class
   */
  public get user(): User {
    return this._user.value;
  }

  /**
   * Return token of user
   */
  public get token(): string {
    return this._user.value?.token;
  }

  constructor(private http: HttpClient,
              private router: Router,
              private storageService: StorageService) {
    this._user = new BehaviorSubject<User>(null);
    this.storageService.get('user').then((user: User) => {
      if (user)
        this._user.next(user);
      else
        this._user.next(null);
    });
  }

  /**
   * Register to SimpleChatrooms
   * @param firstname
   * @param lastname
   * @param username
   * @param password
   */
  public register(firstname: string, lastname: string, username: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'auth/register',
      {firstname, lastname, username, password})
      .pipe(
        tap((user: User) => {
          this._user.next(user);
          this.storageService.set('user', user).then(() => this.router.navigate(['']));
        })
      );
  }

  /**
   * Login to simple chatrooms
   * @param username
   * @param password
   */
  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(environment.apiURL + 'auth/login', {username, password})
      .pipe(
        tap((user: User) => {
          this._user.next(user);
          this.storageService.set('user', user).then(() => this.router.navigate(['']))
        })
      );
  }

  /**
   * Reload user data
   */
  public reload(): void {
    this.http.get<User>(environment.apiURL + `users/${this._user.value.id}`).subscribe(
      (user: User) => {
        user.token = this.user.token;
        this.storageService.set('user', user);
        this._user.next(user);
      }
    );
  }

  /**
   * Logout from SimpleChatrooms
   */
  public logout(): void {
    this.storageService.set('user', null);
    this.router.navigate(['/auth']);
  }

}
