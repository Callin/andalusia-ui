import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {AuthService} from "../service/auth-service";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.addBasicAuth(request);

    return next.handle(request).pipe(catchError((err) => {
      if (err.status === 401) {
        this.router.navigate(['/signin'])
      }
      return throwError(err);
    }));
  }

  addBasicAuth(req: HttpRequest<any>): HttpRequest<any> {
    const headers: any = {};
    const basicAuth = this.authService.getBasicAuth(); // get the token from a service
    if (basicAuth) {
      headers['Authorization'] = basicAuth; // add it to the header
      req = req.clone({
        setHeaders: headers
      });
    }
    return req;
  }
}
