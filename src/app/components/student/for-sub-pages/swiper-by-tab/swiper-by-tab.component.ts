import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/stores/auth.store';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-swiper-by-tab',
  templateUrl: './swiper-by-tab.component.html',
  styleUrls: ['./swiper-by-tab.component.scss']
})
export class SwiperByTabComponent implements OnInit {

  constructor(
    private authStore: AuthStore,
    private router: Router,
    private userStore: UserStore,
    public courseStore: CourseStore
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser_2((data) => {
      this.courseStore.getCourses();
    });
  }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    spaceBetween: 20
  };

  rate = 5;

  courseClicked(courseKey) {
    if(this.authStore.isLoggedIn)
      this.router.navigate(['/student/course/' + courseKey]);
    else
      this.router.navigate(['/course/' + courseKey]);
  }

}