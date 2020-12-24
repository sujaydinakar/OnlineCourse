import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-list-topic-by-category',
  templateUrl: './list-topic-by-category.component.html',
  styleUrls: ['./list-topic-by-category.component.scss']
})
export class ListTopicByCategoryComponent implements OnInit {

  rate = 4;

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
