import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITopic } from 'src/app/models/topic.model';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { CourseTopicStore } from 'src/app/stores/topic.store';
import { UserStore } from 'src/app/stores/user.store';
import { AdminCourseTopicComponent } from '../admin-course-topic/admin-course-topic.component';

@Component({
  selector: 'app-admin-edit-course-topic',
  templateUrl: './admin-edit-course-topic.component.html',
  styleUrls: ['./admin-edit-course-topic.component.scss']
})
export class AdminEditCourseTopicComponent implements OnInit {

  textDescription;
  editCourseTopicForm;
  selectedSlideToggle;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private userStore: UserStore,
    // public categoryStore: CategoryStore,
    // public subCategoryStore: SubCategoryStore,
    public courseTopicStore: CourseTopicStore,

    public dialogRef: MatDialogRef<AdminCourseTopicComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.textDescription = this.data.description;
    this.selectedSlideToggle = this.data.status?.text == 'Active' ? true : false;

    this.editCourseTopicForm = this.formBuilder.group({
      name: this.data.name,
      kh_name: this.data.kh_name,
      description: this.data.description,
      order: this.data.order,
      status: this.selectedSlideToggle,
      parent_category: this.data.categoryKey,
      parent_subcategory: this.data.subcategoryKey
    });
  }


  async ngOnInit(): Promise<void> {
    this.courseTopicStore.getParentCategories();
    this.courseTopicStore.getParentSubCategoriesByParentCategoryKey(this.data.categoryKey);
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let topic = new ITopic;
    const { name, kh_name, order, description, status, parent_category, parent_subcategory } = formData;
    const keywords = generateKeywords([ name ])

    topic = {
      ...this.data,
      ...topic,

      name,
      kh_name,
      keywords,
      order,
      description,

      status: status ? {
        'key': 1,
        'text': 'Active'
      } : {
        'key': 1,
        'text': 'Inactive'
      },
      isDelete: false,

      categoryKey: parent_category,
      categoryRef: this.afs.collection('categories').doc(parent_category).ref,
      subcategoryKey: parent_subcategory,
      subcategoryRef: this.afs.collection('categories').doc(parent_subcategory).ref,

      updatedAt: new Date(),
      updatedBy: this.userStore.User.key,
      updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.courseTopicStore.updateTopic(topic);
    this.openSnackBar("Edit Topic Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  selectParentCategoryChanged(event: any) {
    this.courseTopicStore.getParentSubCategoriesByParentCategoryKey(event.value)
  }
}
