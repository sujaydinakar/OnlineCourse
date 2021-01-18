import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-course-messages',
  templateUrl: './course-messages.component.html',
  styleUrls: ['./course-messages.component.scss']
})
export class CourseMessagesComponent implements OnInit {

  courseId;
  messageForm;

  constructor(
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    
    public userStore: UserStore,
    public courseStore: CourseStore,
  ) { 
    this.messageForm = this.formBuilder.group({
      welcome_message: '',
      congratulation_message: ''
    });
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe(params => {
      this.courseId = params['courseId'];

      if(this.courseId !== 'new') {
        if(this.courseStore.TempCourse.key === null) {
          this.courseStore.getCourseByKey_2(this.courseId, (data) => {
            this.messageForm.patchValue({
              welcome_message: data.welcome_message,
              congratulation_message: data.congratulation_message,
            });
          });
        } else {
          this.messageForm.patchValue({
            welcome_message: this.courseStore.TempCourse.welcome_message,
            congratulation_message: this.courseStore.TempCourse.congratulation_message,
          });
        }
      }
    });

    this.messageForm.valueChanges.subscribe((value) => {
      let data = this.courseStore.TempCourse;

      this.courseStore.TempCourse = {
        ...data,
        ...value, 

        createdAt: new Date(),
        createdBy: this.userStore.User,
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      }
    });
  }

  onSubmit(formData) {

  }

}
