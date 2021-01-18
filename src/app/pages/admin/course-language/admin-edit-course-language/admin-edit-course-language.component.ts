import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILanguage } from 'src/app/models/language.model';

import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CourseLanguageStore } from 'src/app/stores/language.store';
import { UserStore } from 'src/app/stores/user.store';

import { AdminCourseLanguageComponent } from '../admin-course-language/admin-course-language.component';


@Component({
  selector: 'app-admin-edit-course-language',
  templateUrl: './admin-edit-course-language.component.html',
  styleUrls: ['./admin-edit-course-language.component.scss']
})
export class AdminEditCourseLanguageComponent implements OnInit {

  editCourseLanguageForm;
  selectedSlideToggle;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private languageStore: CourseLanguageStore,
    private userStore: UserStore,

    public dialogRef: MatDialogRef<AdminCourseLanguageComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.selectedSlideToggle = this.data.status.text == 'Active' ? true : false;

    this.editCourseLanguageForm = this.formBuilder.group({
      name: this.data.name,
      kh_name: this.data.kh_name,
      short_name: this.data.short_name,
      order: this.data.order,
      status: this.selectedSlideToggle
    });
  }


  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let level = new ILanguage;
    const { name, kh_name, short_name, order, status } = formData;
    const keywords = generateKeywords([ name ])

    level = {
      ...this.data,
      ...level,

      name,
      kh_name,
      short_name,
      keywords,
      order,
      
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

    this.languageStore.updateLanguage(level);
    this.openSnackBar("Edit Language Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}