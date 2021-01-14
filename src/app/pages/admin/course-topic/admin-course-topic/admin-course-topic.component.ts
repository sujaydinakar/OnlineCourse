import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

import { AdminConfirmationDialogComponent } from 'src/app/shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AdminAddCourseTopicComponent } from '../admin-add-course-topic/admin-add-course-topic.component';
import { AdminEditCategoryComponent } from '../../course-category/admin-edit-category/admin-edit-category.component';
import { CourseTopicStore } from 'src/app/stores/topic.store';
import { AdminEditCourseTopicComponent } from '../admin-edit-course-topic/admin-edit-course-topic.component';

@Component({
  selector: 'app-admin-course-topic',
  templateUrl: './admin-course-topic.component.html',
  styleUrls: ['./admin-course-topic.component.scss']
})
export class AdminCourseTopicComponent implements OnInit {

  parentCategoryKey;
  parentSubCategoryKey;
  
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

}