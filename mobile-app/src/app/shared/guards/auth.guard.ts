import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from "../../models/user.model";
import {StorageService} from "../../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storageService: StorageService,
              private router: Router) {
  }

  /**
   * Redirects a user that is not authenticated to the auth page
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.storageService.get('user').then((user: User) => {
        if (user) // if user is authenticated allow routing
          return true;
        this.router.navigate(['/auth']); // redirect user to auth page if not authenticated
        return false;
      }
    );
  }


}
