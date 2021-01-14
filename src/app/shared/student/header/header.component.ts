import { Component, OnInit } from '@angular/core';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { CourseTopicStore } from 'src/app/stores/topic.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public categoryStore: CategoryStore,
    public subcategoryStore: SubCategoryStore,
    public topicStore: CourseTopicStore
  ) { }

  ngOnInit(): void {
    this.categoryStore.getCategories();
    this.subcategoryStore.getSubCategories_2();
    this.topicStore.getTopics_2();
  }
}
