import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/models/course.model';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-creating-new-course-sidebar',
  templateUrl: './creating-new-course-sidebar.component.html',
  styleUrls: ['./creating-new-course-sidebar.component.scss']
})
export class CreatingNewCourseSidebarComponent implements OnInit {

  courseId;

  constructor(
    private userStore: UserStore,
    private courseStore: CourseStore,
  
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.forEach(params => {
      this.courseId = params['courseId'];
      
      if(this.courseId !== 'new') {
        this.courseStore.getCourseByKey(this.courseId);
      } else {
        this.courseStore.TempCourse = new ICourse();
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser();
  }
  
}
