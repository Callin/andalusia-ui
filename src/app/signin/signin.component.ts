import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../service/auth-service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  invalidCredentials = false;

  signInFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.invalidCredentials.subscribe(valid => this.invalidCredentials = valid);

    this.signInFormGroup = this.formBuilder.group({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null)
    });
  }

  onSignin() {
    const username = this.signInFormGroup.controls['email'].value;
    const password = this.signInFormGroup.controls['password'].value;

    this.authService.signIn(username, password);

  }

}
