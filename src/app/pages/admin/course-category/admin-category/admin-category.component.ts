import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdminAddCategoryComponent } from '../admin-add-category/admin-add-category.component';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openAddCourseCategoryDialog() {
    const dialogRef = this.dialog.open(AdminAddCategoryComponent, {
      width: '750px',
      height: '100vh'
    });

    dialogRef.updatePosition({ 'top': '0', 'right': '0' })
  }
}
