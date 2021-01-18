import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  constructor(
    public courseStore: CourseStore,
  ) { }

  ngOnInit(): void {
  }

  btnPublishClicked() {
    this.courseStore.TempCourse = {
      ...this.courseStore.TempCourse,
      status: {
        key: 1,
        text: this.courseStore.TempCourse.status.text == "Unpublish" ? 'Publish' : 'Unpublish'
      }
    }

    this.courseStore.submitSaveCourse();
  }

  btnDeleteCliced() {
    this.courseStore.TempCourse = {
      ...this.courseStore.TempCourse,
      isDelete: true
    }

    this.courseStore.submitSaveCourse();
  }

}
