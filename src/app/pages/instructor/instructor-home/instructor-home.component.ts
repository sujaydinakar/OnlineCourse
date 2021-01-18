import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-instructor-home',
  templateUrl: './instructor-home.component.html',
  styleUrls: ['./instructor-home.component.scss']
})
export class InstructorHomeComponent implements OnInit {

  constructor(
    public courseStore: CourseStore,
  ) { }

  ngOnInit(): void {
    this.courseStore.getCourses();
  }

}
