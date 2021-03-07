import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

import { AdminAddSubcategoryComponent } from '../admin-add-subcategory/admin-add-subcategory.component';
import { AdminEditSubcategoryComponent } from '../admin-edit-subcategory/admin-edit-subcategory.component';
import { AdminConfirmationDialogComponent } from 'src/app/shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { tabs } from 'src/app/dummy/tabs';

@Component({
  selector: 'app-admin-subcategory',
  templateUrl: './admin-subcategory.component.html',
  styleUrls: ['./admin-subcategory.component.scss']
})
export class AdminSubcategoryComponent implements OnInit {
  
  parentKey;

  TABS = tabs.admin_course_category;
  
  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,

    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,
  ) { 
    this.activatedRoute.params.subscribe(params => {
      this.parentKey = params['key'];
      this.subCategoryStore.getParentCategory(this.parentKey);
      this.subCategoryStore.fetchSubCategoryData(null, null, this.parentKey);
    });
  }

  ngOnInit(): void {
    this.categoryStore.getCategories();
    this.subCategoryStore.fetchSubCategoryData(null, null, this.parentKey);
  }

  openAddCourseCategoryDialog() {
    const dialogRef = this.dialog.open(AdminAddSubcategoryComponent, {
      width: '750px',
      height: '96vh'
    });

    dialogRef.updatePosition({ 'top': '2vh', 'right': '2vh' });
  }

  editCategory(category) {
    const dialogRef = this.dialog.open(AdminEditSubcategoryComponent, {
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
        this.subCategoryStore.deleteSubCategory(category);
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
      this.subCategoryStore.fetchSubCategoryDataMore(this.parentKey)
    }
  }
}