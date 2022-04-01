import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from "../../models/user.model";
import {StorageService} from "../../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  /**
   * redirects users that are already authenticated to the home page
   * @param childRoute
   * @param state
   */
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.storageService.get('user').then((user: User) => {
        if (!user) // if user does not exists (no logged in user)
          return true;
        this.router.navigate(['']); // if user exists redirect to home page
        return false;
      }
    )
  }

}
