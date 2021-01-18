import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILanguage } from 'src/app/models/language.model';

import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CourseLanguageStore } from 'src/app/stores/language.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-admin-add-course-language',
  templateUrl: './admin-add-course-language.component.html',
  styleUrls: ['./admin-add-course-language.component.scss']
})
export class AdminAddCourseLanguageComponent implements OnInit {

  addCourseLanguageForm;

  constructor(
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  
    private userStore: UserStore,
    private languageStore: CourseLanguageStore,
  ) {
    this.addCourseLanguageForm = this.formBuilder.group({
      name: '',
      kh_name: '',
      short_name: '',
      order: '',
      status: ''
    });
  }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

  async onSubmit(formData) {
    let language = new ILanguage;
    const { name, kh_name, short_name, order, status } = formData;
    const keywords = generateKeywords([ name ])
    
    language = {
      ...language,

      name,
      kh_name,
      short_name,
      order,
      keywords,

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

    this.languageStore.addLanguage(language);
    this.openSnackBar("Add Language Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}