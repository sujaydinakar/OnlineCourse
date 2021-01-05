import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-student-recommendation',
  templateUrl: './student-recommendation.component.html',
  styleUrls: ['./student-recommendation.component.scss']
})
export class StudentRecommendationComponent implements OnInit {

  rate = 3.6;

  constructor() { }

  ngOnInit(): void {

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
}
