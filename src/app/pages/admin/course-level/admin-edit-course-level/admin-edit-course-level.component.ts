import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ILevel } from 'src/app/models/level.model';

import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';

import { CategoryStore } from 'src/app/stores/category.store';
import { CourseLevelStore } from 'src/app/stores/level.store';
import { UserStore } from 'src/app/stores/user.store';

import { AdminCourseLevelComponent } from '../admin-course-level/admin-course-level.component';

@Component({
  selector: 'app-admin-edit-course-level',
  templateUrl: './admin-edit-course-level.component.html',
  styleUrls: ['./admin-edit-course-level.component.scss']
})
export class AdminEditCourseLevelComponent implements OnInit {

  textDescription;
  textKhDescription;
  editCourseLevelForm;
  selectedSlideToggle;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private levelStore: CourseLevelStore,
    private userStore: UserStore,

    public dialogRef: MatDialogRef<AdminCourseLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.textDescription = this.data.description;
    this.textKhDescription = this.data.kh_description;
    this.selectedSlideToggle = this.data.status.text == 'Active' ? true : false;

    this.editCourseLevelForm = this.formBuilder.group({
      name: this.data.name,
      kh_name: this.data.kh_name,
      description: this.data.description,
      kh_description: this.data.kh_description,
      order: this.data.order,
      status: this.selectedSlideToggle
    });
  }


  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let level = new ILevel;
    const { name, kh_name, order, description, kh_description, status } = formData;
    const keywords = generateKeywords([ name ])

    level = {
      ...this.data,
      ...level,

      name,
      kh_name,
      keywords,
      order,
      description,
      kh_description,
      
      status: status ? {
        'key': 1,
        'text': 'Active'
      } : {
        'key': 1,
        'text': 'Inactive'
      },

      updatedAt: new Date(),
      updatedBy: this.userStore.User,
      
      // updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.levelStore.updateLevel(level);
    this.openSnackBar("Edit Level Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
