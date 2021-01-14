import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ISubCategory } from 'src/app/models/subCategory.model';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { UserStore } from 'src/app/stores/user.store';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-add-subcategory',
  templateUrl: './admin-add-subcategory.component.html',
  styleUrls: ['./admin-add-subcategory.component.scss']
})
export class AdminAddSubcategoryComponent implements OnInit {

  addCategoryForm;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private userStore: UserStore,
    private subCategoryStore: SubCategoryStore,
  ) {
    this.addCategoryForm = this.formBuilder.group({
      name: '',
      kh_name: '',
      description: '',
      order: 1,
      status: ''
    });
  }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let category = new ISubCategory;
    const { name, kh_name, order, description, status } = formData;
    const keywords = generateKeywords([ name ])
    
    category = {
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
      isDelete: false,

      categoryKey: null,
      categoryRef: null,

      createdAt: new Date(),
      createdBy: this.userStore.User.key,
      createdRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
      updatedAt: new Date(),
      updatedBy: this.userStore.User.key,
      updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.subCategoryStore.addSubCategory(category);
    this.openSnackBar("Add Category Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
