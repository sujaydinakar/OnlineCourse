import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStore } from 'src/app/stores/auth.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private authStore: AuthStore,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // if (!this.authStore.isLoggedIn) {
    //   this.authService.signin("dummy@gmail.com", "123456")
    // }
  }

}
