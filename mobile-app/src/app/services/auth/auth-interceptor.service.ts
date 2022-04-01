import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  /**
   * Intercept every request and add the bearer token to the HTTP header
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token) {
      const modifiedRequest = req.clone({headers: new HttpHeaders().append("Authorization", "Bearer " + this.authService.token)});
      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }
}
