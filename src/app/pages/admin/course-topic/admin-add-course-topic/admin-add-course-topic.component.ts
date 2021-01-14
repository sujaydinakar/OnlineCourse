import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ITopic } from 'src/app/models/topic.model';
import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';
import { CourseTopicStore } from 'src/app/stores/topic.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-admin-add-course-topic',
  templateUrl: './admin-add-course-topic.component.html',
  styleUrls: ['./admin-add-course-topic.component.scss']
})
export class AdminAddCourseTopicComponent implements OnInit {

  addCourseTopicForm;

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,

    private userStore: UserStore,
    private courseTopicStore: CourseTopicStore,
  ) {
    this.addCourseTopicForm = this.formBuilder.group({
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
    let topic = new ITopic;
    const { name, kh_name, order, description, status } = formData;
    const keywords = generateKeywords([ name ]);
    
    topic = {
      ...topic,

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
      subcategoryKey: null,
      subcategoryRef: null,

      createdAt: new Date(),
      createdBy: this.userStore.User.key,
      createdRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
      updatedAt: new Date(),
      updatedBy: this.userStore.User.key,
      updatedRef: this.afs.collection('users').doc(this.userStore.User.key).ref,
    };

    this.courseTopicStore.addTopic(topic);
    this.openSnackBar("Add Topic Successfully!", "Close");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}