import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStore } from 'src/app/stores/auth.store';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-students-are-viewing',
  templateUrl: './students-are-viewing.component.html',
  styleUrls: ['./students-are-viewing.component.scss']
})
export class StudentsAreViewingComponent implements OnInit {

  rate = 3.6;

  constructor(
    private authStore: AuthStore,
    private userStore: UserStore,
    public courseStore: CourseStore,
    private router: Router
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

  courseClicked(courseKey) {
    if(this.authStore.isLoggedIn)
      this.router.navigate(['/student/course/' + courseKey]);
    else
      this.router.navigate(['/course/' + courseKey]);
  }

}
