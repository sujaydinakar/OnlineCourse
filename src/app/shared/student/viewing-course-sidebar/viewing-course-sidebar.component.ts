import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/models/course.model';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-viewing-course-sidebar',
  templateUrl: './viewing-course-sidebar.component.html',
  styleUrls: ['./viewing-course-sidebar.component.scss']
})
export class ViewingCourseSidebarComponent implements OnInit {

  courseId;

  constructor(
    private userStore: UserStore,
    private courseStore: CourseStore,
  
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.forEach(params => {
      this.courseId = params['courseId'];
      this.courseStore.getCourseByKey(this.courseId);
    });
  }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }

}