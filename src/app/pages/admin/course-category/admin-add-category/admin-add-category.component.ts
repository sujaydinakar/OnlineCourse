import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/models/category.model';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CategoryStore } from 'src/app/stores/category.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-admin-add-category',
  templateUrl: './admin-add-category.component.html',
  styleUrls: ['./admin-add-category.component.scss']
})
export class AdminAddCategoryComponent implements OnInit {
  
  addCategoryForm;

  constructor(
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  
    private userStore: UserStore,
    private categoryStore: CategoryStore,
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
    let category = new ICategory;
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

      createdAt: new Date(),
      createdBy: this.userStore.User.key,
      createdRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
      updatedAt: new Date(),
      updatedBy: this.userStore.User.key,
      updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.categoryStore.addCategory(category);
    this.openSnackBar("Add Category Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
