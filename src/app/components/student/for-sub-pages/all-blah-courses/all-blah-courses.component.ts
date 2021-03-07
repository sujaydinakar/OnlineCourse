import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-all-blah-courses',
  templateUrl: './all-blah-courses.component.html',
  styleUrls: ['./all-blah-courses.component.scss']
})
export class AllBlahCoursesComponent implements OnInit {
  rate = 5;

  constructor(
    public courseStore: CourseStore
  ) { }

  ngOnInit(): void {
  }

}
