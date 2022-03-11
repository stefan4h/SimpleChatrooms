import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {map, take} from "rxjs/operators";
import {User} from "../../models/user.model";
import {StorageService} from "../../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {

  constructor(private storageService: StorageService,
              private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.storageService.get('user').then((user: User) => {
        console.log(user);
        if (!user)
          return true;
        this.router.navigate(['']);
        return false;
      }
    )
  }

}
