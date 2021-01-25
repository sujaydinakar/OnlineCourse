import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

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

  selectedImage;
  downloadURL: string;
  imageFile: File;
  task: AngularFireUploadTask;
  percentage;

  fileUploadedURL;
  fileUploadedPath;

  constructor(
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
  
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

      categoryImagePath: this.fileUploadedPath,
      categoryImageUrl: this.fileUploadedURL,

      createdAt: new Date(),
      createdBy: this.userStore.User,
      updatedAt: new Date(),
      updatedBy: this.userStore.User,

      // createdRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
      // updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.categoryStore.addCategory(category);
    this.openSnackBar("Add Category Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  inputImageChanged(event) {
    this.selectedImage = event.currentFiles[0];
    this.uploadFilesToFirebase(event.currentFiles[0], 'category_thumbnail');
  }

  uploadFilesToFirebase(item: File, basePath: string) {
    const filePath = `${basePath}/${Date.now()}_${item.name}`;
    const storageRef = this.storage.ref(filePath);

    this.task = this.storage.upload(filePath, item);
    this.task.percentageChanges().subscribe((data) => {
      this.percentage = data;
    });

    this.task.then((f) => {
      f.ref.getDownloadURL().then((downloadURL) => {
        this.fileUploadedURL = downloadURL;
        this.fileUploadedPath = filePath;
      });
    });
  }

  formatPercentage(number) {
    return parseFloat(number).toFixed(2);
  }
}
