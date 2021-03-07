import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/stores/user.store';

import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss']
})
export class StudentLoginComponent implements OnInit {

  loginForm;

  constructor(
    public userStore: UserStore,
    // private authService: SocialAuthService,
    private authService2: AuthService,

    public formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  user: SocialUser;
  loggedIn: boolean;

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });
  }

  onSubmit(formData) {
    const { email, password } = formData;
    this.authService2.signin(email, password);
  }

  loginWithGoogle() {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook() {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
