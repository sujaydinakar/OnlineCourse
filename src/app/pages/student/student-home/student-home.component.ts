import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseStore } from 'src/app/stores/course.store';
import { UserStore } from 'src/app/stores/user.store';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.scss']
})
export class StudentHomeComponent implements OnInit {

  constructor(
    private router: Router,
    public userStore: UserStore,
    public courseStore: CourseStore,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.userStore.getCurrentLoggedInUser_2((data) => {
      if (data) {
        this.courseStore.getCourses();
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

}
