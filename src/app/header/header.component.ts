import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LOCAL_STORAGE_SERVICE, LocalStorageService} from "../service/localstorage-service";
import {Util} from "../util/util";
import {AuthService} from "../service/auth-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated = false;

  constructor(@Inject(LOCAL_STORAGE_SERVICE) public localStorage: LocalStorageService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.changeIsAuthenticated.subscribe(isAuth => this.isAuthenticated = isAuth);
    let authorization = this.localStorage.get('Authorization');
    if (Util.isNullOrUndefined(authorization)) {
      this.isAuthenticated = false;
      this.router.navigate(['/signin']);
      console.log('Not signed in');
    } else {
      this.isAuthenticated = true;
      console.log('User id is ' + authorization);
    }
  }

  signOut() {
    this.authService.signOut();
  }

}
