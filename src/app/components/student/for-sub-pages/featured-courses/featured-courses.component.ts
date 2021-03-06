import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-featured-courses',
  templateUrl: './featured-courses.component.html',
  styleUrls: ['./featured-courses.component.scss']
})
export class FeaturedCoursesComponent implements OnInit {
  rate = 5;

  constructor(
    public courseStore: CourseStore
  ) { }

  ngOnInit(): void {
  }

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: false,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
  };
}
