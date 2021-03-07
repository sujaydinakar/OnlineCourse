import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-student-course-description',
  templateUrl: './student-course-description.component.html',
  styleUrls: ['./student-course-description.component.scss']
})
export class StudentCourseDescriptionComponent implements OnInit {

  constructor(
    public courseStore: CourseStore
  ) { }

  ngOnInit(): void {
    
  }

}
