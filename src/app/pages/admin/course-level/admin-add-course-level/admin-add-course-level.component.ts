import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ILevel } from 'src/app/models/level.model';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CategoryStore } from 'src/app/stores/category.store';
import { CourseLevelStore } from 'src/app/stores/level.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-admin-add-course-level',
  templateUrl: './admin-add-course-level.component.html',
  styleUrls: ['./admin-add-course-level.component.scss']
})
export class AdminAddCourseLevelComponent implements OnInit {

  addCourseLevelForm;

  constructor(
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  
    private userStore: UserStore,
    private levelStore: CourseLevelStore,
  ) {
    this.addCourseLevelForm = this.formBuilder.group({
      name: '',
      kh_name: '',
      order: '',
      description: '',
      kh_description: '',
      status: ''
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
      ...level,

      name,
      kh_name,
      order,
      keywords,
      description,
      kh_description,

      status: status ? {
        'key': 1,
        'text': 'Active'
      } : {
        'key': 1,
        'text': 'Inactive'
      },
      isDelete: false,

      createdAt: new Date(),
      createdBy: this.userStore.User,
      updatedAt: new Date(),
      updatedBy: this.userStore.User,

      // createdRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
      // updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.levelStore.addLevel(level);
    this.openSnackBar("Add Level Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}