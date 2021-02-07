import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public images: Array<string> = [
    './assets/images/banner 1.png',
    './assets/images/banner 2.png',
    './assets/images/banner 3.jpg'
  ]

  constructor(
    public userStore: UserStore,
    public courseStore: CourseStore,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser_2((data) => {
  
    });
  }

}
