import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ICategory } from 'src/app/models/category.model';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CategoryStore } from 'src/app/stores/category.store';
import { UserStore } from 'src/app/stores/user.store';
import { AdminCategoryComponent } from '../admin-category/admin-category.component';

@Component({
  selector: 'app-admin-edit-category',
  templateUrl: './admin-edit-category.component.html',
  styleUrls: ['./admin-edit-category.component.scss']
})
export class AdminEditCategoryComponent implements OnInit {
  textDescription;
  editCategoryForm;
  selectedSlideToggle;

  selectedImage;
  downloadURL: string;
  imageFile: File;
  task: AngularFireUploadTask;
  percentage;

  fileUploadedURL;
  fileUploadedPath;

  old_fileUploadedPath;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private userStore: UserStore,
    private categoryStore: CategoryStore,

    public dialogRef: MatDialogRef<AdminCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.textDescription = this.data.description;
    this.selectedSlideToggle = this.data.status.text == 'Active' ? true : false;
    this.fileUploadedURL = this.data.categoryImageUrl;
    this.fileUploadedPath = this.data.categoryImagePath;
    this.old_fileUploadedPath = this.data.categoryImagePath;

    this.editCategoryForm = this.formBuilder.group({
      name: this.data.name,
      kh_name: this.data.kh_name,
      description: this.data.description,
      order: this.data.order,
      status: this.selectedSlideToggle
    });
  }


  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let category = new ICategory;
    const { name, kh_name, order, description, status } = formData;
    const keywords = generateKeywords([ name ]);

    if(this.fileUploadedPath !== this.old_fileUploadedPath && this.old_fileUploadedPath) 
      this.categoryStore.deleteFileFromFirebase(this.old_fileUploadedPath);

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

      categoryImageUrl: this.fileUploadedURL,
      categoryImagePath: this.fileUploadedPath,

      updatedAt: new Date(),
      updatedBy: this.userStore.User,
      
      // updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.categoryStore.updateCategory(category);
    this.openSnackBar("Edit Category Successfully!", "Close");
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

        console.log('Upload Image Successfully!');
      });
    });
  }

  formatPercentage(number) {
    return parseFloat(number).toFixed(2);
  }
}
