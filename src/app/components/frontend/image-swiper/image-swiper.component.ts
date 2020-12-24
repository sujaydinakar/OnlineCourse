import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { PaginationOptions } from 'swiper/types/components/pagination';
import { ScrollbarOptions } from 'swiper/types/components/scrollbar';

@Component({
  selector: 'app-image-swiper',
  templateUrl: './image-swiper.component.html',
  styleUrls: ['./image-swiper.component.scss']
})
export class ImageSwiperComponent implements OnInit {
  @Input('images') images = [];

  constructor() { }

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
    pagination: true,
    autoplay: true,
  };

  private scrollbar: ScrollbarOptions = {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true
  };

  private pagination: PaginationOptions = {
    el: '.swiper-pagination',
    clickable: true,
    hideOnClick: false
  };

  // @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  // @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
}
