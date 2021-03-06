import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from "./localstorage-service";
import {UserService} from "./user-service";
import {User} from "../dto/user";
import {Util} from "../util/util";

@Injectable()
export class AuthService {
  @Output() changeIsAuthenticated: EventEmitter<boolean> = new EventEmitter();
  @Output() invalidCredentials: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router,
              @Inject(LOCAL_STORAGE_SERVICE) public localStorage: LocalStorageService,
              public userService: UserService) {
  }

  signIn(username: string, password: string) {

    const authenticationHeaderValue = 'Basic ' + btoa(username + ':' + password);
    this.userService.checkCredentials(authenticationHeaderValue, username).subscribe((result: User) => {
        if (!Util.isNullOrUndefined(result)) {
          console.log("checking credentials");
          this.changeIsAuthenticated.emit(true);
          this.invalidCredentials.emit(false);
          this.localStorage.set('Authorization', authenticationHeaderValue);
          this.localStorage.set('userId', result.id);
          this.localStorage.set('email', result.email);
          this.router.navigate(['']);
        }
      },
      error => {
        console.log(error);
        this.invalidCredentials.emit(true);

      });
  }

  public isAuthenticated(): boolean {
    const basicAuth = this.localStorage.get('Authorization');
    return !((basicAuth === undefined)  || (basicAuth === null))
  }

  getBasicAuth(): string{
    return this.localStorage.get('Authorization');
  }

  signOut() {
    this.changeIsAuthenticated.emit(false);
    this.localStorage.remove('Authorization');
    this.router.navigate(['/signin']);
  }

}
