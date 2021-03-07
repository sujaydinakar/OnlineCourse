import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategoryStore } from 'src/app/stores/category.store';

import { AdminAddCategoryComponent } from '../admin-add-category/admin-add-category.component';
import { AdminEditCategoryComponent } from '../admin-edit-category/admin-edit-category.component';
import { AdminConfirmationDialogComponent } from 'src/app/shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { tabs } from 'src/app/dummy/tabs';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

    public categoryStore: CategoryStore,
  ) { }

  ngOnInit(): void {
    this.categoryStore.fetchCategoryData(null, null);
  }

  openAddCourseCategoryDialog() {
    const dialogRef = this.dialog.open(AdminAddCategoryComponent, {
      width: '750px',
      height: '96vh'
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editCategory(category) {
    const dialogRef = this.dialog.open(AdminEditCategoryComponent, {
      width: '750px',
      height: '96vh',
      data: { ...category }
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  deleteCategory(category) {
    const dialogRef = this.dialog.open(AdminConfirmationDialogComponent, {
      data: { result: false }
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result) {
        this.categoryStore.deleteCategory(category);
        this.openSnackBar("Delete Category Successfully!", "Close");
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
      this.categoryStore.fetchCategoryDataMore()
    }
  }

  TABS: any[] = tabs.admin_course_category;

  create(data: any) { }
}
