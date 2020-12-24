import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-students-are-viewing',
  templateUrl: './students-are-viewing.component.html',
  styleUrls: ['./students-are-viewing.component.scss']
})
export class StudentsAreViewingComponent implements OnInit {

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
