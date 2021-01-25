import { Component, OnInit } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-subject-categories',
  templateUrl: './subject-categories.component.html',
  styleUrls: ['./subject-categories.component.scss']
})
export class SubjectCategoriesComponent implements OnInit {

  constructor(
    public categoryStore: CategoryStore,
  ) { }

  ngOnInit(): void {
    this.categoryStore.getCategories();
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
