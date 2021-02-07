import { Component, OnInit } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';
import { CourseStore } from 'src/app/stores/course.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { CourseTopicStore } from 'src/app/stores/topic.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userStore: UserStore,
    public courseStore: CourseStore,
    public categoryStore: CategoryStore,
    public subcategoryStore: SubCategoryStore,
    public topicStore: CourseTopicStore
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser_2((data) => {
      this.categoryStore.getCategories();
      this.subcategoryStore.getSubCategories_2();
      this.topicStore.getTopics_2();
    });
  }
}
