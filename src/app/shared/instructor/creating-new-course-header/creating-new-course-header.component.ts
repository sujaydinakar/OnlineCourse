import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-creating-new-course-header',
  templateUrl: './creating-new-course-header.component.html',
  styleUrls: ['./creating-new-course-header.component.scss']
})
export class CreatingNewCourseHeaderComponent implements OnInit {

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
