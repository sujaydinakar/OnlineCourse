import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { UserStore } from 'src/app/stores/user.store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm;

  constructor(
    public userStore: UserStore,

    private location: Location,
    public formBuilder: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }

  onSubmit(formData) {
    const { email, password } = formData;

    this.auth.signInWithEmailAndPassword(email, password).then((user: any) => {
      // this.router.navigate(['/admin']);
      this.location.back();
    }).catch((error) => {
      console.log(error)
    });
  }

}
