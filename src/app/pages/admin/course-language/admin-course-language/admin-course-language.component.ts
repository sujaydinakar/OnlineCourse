import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CourseLevelStore } from 'src/app/stores/level.store';
import { CategoryStore } from 'src/app/stores/category.store';

import { AdminAddCourseLanguageComponent } from '../admin-add-course-language/admin-add-course-language.component';
import { AdminEditCourseLanguageComponent } from '../admin-edit-course-language/admin-edit-course-language.component';
import { AdminConfirmationDialogComponent } from 'src/app/shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { CourseLanguageStore } from 'src/app/stores/language.store';


@Component({
  selector: 'app-admin-course-language',
  templateUrl: './admin-course-language.component.html',
  styleUrls: ['./admin-course-language.component.scss']
})
export class AdminCourseLanguageComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

    public languageStore: CourseLanguageStore,
  ) { }

  ngOnInit(): void {
    this.languageStore.fetchLanguageData(null, null);
  }

  openAddCourseCategoryDialog() {
    const dialogRef = this.dialog.open(AdminAddCourseLanguageComponent, {
      width: '750px',
      height: '96vh'
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editCategory(level) {
    const dialogRef = this.dialog.open(AdminEditCourseLanguageComponent, {
      width: '750px',
      height: '96vh',
      data: { ...level }
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  deleteCategory(level) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogComponent, {
      data: { result: false }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.languageStore.deleteLanguage(level);
        this.openSnackBar("Delete Level Successfully!", "Close");
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
      this.languageStore.fetchLanguageDataMore()
    }
  }

}