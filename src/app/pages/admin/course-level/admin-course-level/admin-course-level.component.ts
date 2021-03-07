import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryStore } from 'src/app/stores/category.store';

import { AdminAddCourseLevelComponent } from '../admin-add-course-level/admin-add-course-level.component';
import { AdminEditCourseLevelComponent } from '../admin-edit-course-level/admin-edit-course-level.component';
import { AdminConfirmationDialogComponent } from 'src/app/shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { CourseLevelStore } from 'src/app/stores/level.store';
import { tabs } from 'src/app/dummy/tabs';

@Component({
  selector: 'app-admin-course-level',
  templateUrl: './admin-course-level.component.html',
  styleUrls: ['./admin-course-level.component.scss']
})
export class AdminCourseLevelComponent implements OnInit {

  TABS = tabs.level;
  
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

    public levelStore: CourseLevelStore,
  ) { }

  ngOnInit(): void {
    this.levelStore.fetchLevelData(null, null);
  }

  openAddCourseCategoryDialog() {
    const dialogRef = this.dialog.open(AdminAddCourseLevelComponent, {
      width: '750px',
      height: '96vh'
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editCategory(level) {
    const dialogRef = this.dialog.open(AdminEditCourseLevelComponent, {
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
        this.levelStore.deleteLevel(level);
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
      this.levelStore.fetchLevelDataMore()
    }
  }

}
