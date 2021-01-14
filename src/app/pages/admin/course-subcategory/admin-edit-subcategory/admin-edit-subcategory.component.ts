import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/models/category.model';
import { ISubCategory } from 'src/app/models/subCategory.model';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CategoryStore } from 'src/app/stores/category.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { UserStore } from 'src/app/stores/user.store';
import { AdminSubcategoryComponent } from '../admin-subcategory/admin-subcategory.component';

@Component({
  selector: 'app-admin-edit-subcategory',
  templateUrl: './admin-edit-subcategory.component.html',
  styleUrls: ['./admin-edit-subcategory.component.scss']
})
export class AdminEditSubcategoryComponent implements OnInit {
  textDescription;
  editCategoryForm;
  selectedSlideToggle;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private userStore: UserStore,
    public categoryStore: CategoryStore,
    public subCategoryStore: SubCategoryStore,

    public dialogRef: MatDialogRef<AdminSubcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.textDescription = this.data.description;
    this.selectedSlideToggle = this.data.status?.text == 'Active' ? true : false;

    this.editCategoryForm = this.formBuilder.group({
      name: this.data.name,
      kh_name: this.data.kh_name,
      parent_category: this.data.categoryKey,
      description: this.data.description,
      order: this.data.order,
      status: this.selectedSlideToggle
    });
  }


  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let category = new ISubCategory;
    const { name, kh_name, order, description, status, parent_category } = formData;
    const keywords = generateKeywords([ name ])

    category = {
      ...this.data,
      ...category,

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

      categoryKey: parent_category,
      categoryRef: this.afs.collection('categories').doc(parent_category).ref,

      updatedAt: new Date(),
      updatedBy: this.userStore.User.key,
      updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.subCategoryStore.updateSubCategory(category);
    this.openSnackBar("Edit Category Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
