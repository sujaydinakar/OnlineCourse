import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from 'src/app/stores/auth.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { UserStore } from 'src/app/stores/user.store';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-subject-categories',
  templateUrl: './subject-categories.component.html',
  styleUrls: ['./subject-categories.component.scss']
})
export class SubjectCategoriesComponent implements OnInit {

  constructor(
    private router: Router,
    private authStore: AuthStore,
    private userStore: UserStore,
    public categoryStore: CategoryStore,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser_2((data) => {
      this.categoryStore.getCategories();
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

  courseCategoryClicked(categoryKey) {
    if (this.authStore.isLoggedIn)
      this.router.navigate(['/student/category/' + categoryKey])
    else
      this.router.navigate(['/category/' + categoryKey])
  }
  
}
