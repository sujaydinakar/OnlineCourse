import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-viewing-course-header',
  templateUrl: './viewing-course-header.component.html',
  styleUrls: ['./viewing-course-header.component.scss']
})
export class ViewingCourseHeaderComponent implements OnInit {

  courseId;

  constructor(
    private courseStore: CourseStore,
    private route: ActivatedRoute,

    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.forEach(params => {
      this.courseId = params['courseId'];
    });
  }

  ngOnInit(): void {
    
  }

  btnSaveCourseClicked() {
    this.courseStore.submitSaveCourse();
  }

}
