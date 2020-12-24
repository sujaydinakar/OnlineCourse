import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-swiper-by-tab',
  templateUrl: './swiper-by-tab.component.html',
  styleUrls: ['./swiper-by-tab.component.scss']
})
export class SwiperByTabComponent implements OnInit {

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

  rate = 5;
}
