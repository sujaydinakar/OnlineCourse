import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CourseTopicStore } from 'src/app/stores/topic.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

import { AdminConfirmationDialogComponent } from 'src/app/shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { AdminAddCourseTopicComponent } from '../admin-add-course-topic/admin-add-course-topic.component';
import { AdminEditCourseTopicComponent } from '../admin-edit-course-topic/admin-edit-course-topic.component';
import { tabs } from 'src/app/dummy/tabs';

@Component({
  selector: 'app-admin-course-topic',
  templateUrl: './admin-course-topic.component.html',
  styleUrls: ['./admin-course-topic.component.scss']
})
export class AdminCourseTopicComponent implements OnInit {

  parentCategoryKey;
  parentSubCategoryKey;

  TABS = tabs.admin_course_category;
  
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,

    public topicStore: CourseTopicStore,
    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.parentCategoryKey = params['key1'];
      this.parentSubCategoryKey = params['key2'];
      this.topicStore.getParentCategory(this.parentCategoryKey);
      this.topicStore.getParentSubCategory(this.parentCategoryKey, this.parentSubCategoryKey);
      this.topicStore.fetchTopicData(null, null, this.parentCategoryKey, this.parentSubCategoryKey);
    });
  }

  ngOnInit(): void {
    this.subCategoryStore.getSubCategories(this.parentCategoryKey);
  }

  openAddCourseTopicDialog() {
    const dialogRef = this.dialog.open(AdminAddCourseTopicComponent, {
      width: '750px',
      height: '96vh'
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editTopic(topic) {
    const dialogRef = this.dialog.open(AdminEditCourseTopicComponent, {
      width: '750px',
      height: '96vh',
      data: { ...topic }
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  deleteTopic(topic) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogComponent, {
      data: { result: false }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.topicStore.deleteTopic(topic);
        this.openSnackBar("Delete Topic Successfully!", "Close");
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  scrollHandler(e) {
    if (e === 'bottom') {
      this.topicStore.fetchTopicDataMore(this.parentCategoryKey, this.parentSubCategoryKey)
    }
  }

  compareFn(object1: any, object2: any) {
    return object1 && object2 ? object1.key === object2.key : object1 === object2;
  }

}