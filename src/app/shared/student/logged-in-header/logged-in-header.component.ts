import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryStore } from 'src/app/stores/category.store';
import { CourseStore } from 'src/app/stores/course.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { CourseTopicStore } from 'src/app/stores/topic.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-logged-in-header',
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['./logged-in-header.component.scss']
})
export class LoggedInHeaderComponent implements OnInit {

  constructor(
    public userStore: UserStore,
    public courseStore: CourseStore,
    public categoryStore: CategoryStore,
    public subcategoryStore: SubCategoryStore,
    public topicStore: CourseTopicStore,
    public authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser_2((data) => {
      this.categoryStore.getCategories();
      this.subcategoryStore.getSubCategories_2();
      this.topicStore.getTopics_2();
    });
  }

  btnSignOutClicked() {
    this.authService.signout();
  }

}
