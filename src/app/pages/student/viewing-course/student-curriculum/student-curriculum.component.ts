import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-student-curriculum',
  templateUrl: './student-curriculum.component.html',
  styleUrls: ['./student-curriculum.component.scss']
})
export class StudentCurriculumComponent implements OnInit {

  courseKey;

  constructor(
    public courseStore: CourseStore,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.courseKey = params.courseId;

      this.courseStore.getCourseSections(this.courseKey);
    });
  }

}
