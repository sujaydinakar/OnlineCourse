import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstructorCreatingCourseComponent } from './layout/backend/instructor-creating-course/instructor-creating-course.component';
import { InstructorDashboardComponent } from './layout/backend/instructor-dashboard/instructor-dashboard.component';

import { MainComponent } from './layout/frontend/main/main.component';
import { Main2Component } from './layout/frontend/main2/main2.component';
import { CaptionsComponent } from './pages/backend/creating-course/captions/captions.component';
import { CourseLandingPagesComponent } from './pages/backend/creating-course/course-landing-pages/course-landing-pages.component';
import { CourseMessagesComponent } from './pages/backend/creating-course/course-messages/course-messages.component';
import { CourseStructureComponent } from './pages/backend/creating-course/course-structure/course-structure.component';
import { CurriculumComponent } from './pages/backend/creating-course/curriculum/curriculum.component';
import { FilmAndEditComponent } from './pages/backend/creating-course/film-and-edit/film-and-edit.component';
import { PricingComponent } from './pages/backend/creating-course/pricing/pricing.component';
import { PromotionsComponent } from './pages/backend/creating-course/promotions/promotions.component';
import { SettingComponent } from './pages/backend/creating-course/setting/setting.component';
import { SetupAndTestVideoComponent } from './pages/backend/creating-course/setup-and-test-video/setup-and-test-video.component';
import { TargetYourStudentsComponent } from './pages/backend/creating-course/target-your-students/target-your-students.component';
import { InstructorHomeComponent } from './pages/backend/instructor-home/instructor-home.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { ListTopicByCategoryComponent } from './pages/frontend/list-topic-by-category/list-topic-by-category.component';
import { TopicDescriptionComponent } from './pages/frontend/topic-description/topic-description.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'category/:id',
        component: ListTopicByCategoryComponent
      },
    ],
  },
  {
    path: '',
    component: Main2Component,
    children: [
      {
        path: 'topic/:id',
        component: TopicDescriptionComponent
      }
    ],
  },
  {
    path: 'instructor',
    component: InstructorDashboardComponent,
    children: [
      {
        path: '',
        component: InstructorHomeComponent
      }
    ]
  },
  {
    path: 'create_course',
    component: InstructorCreatingCourseComponent,
    children: [
      {
        path: '',
        redirectTo: 'target_your_student',
        pathMatch: 'full'
      },
      {
        path: 'target_your_student',
        component: TargetYourStudentsComponent
      },
      {
        path: 'course_structure',
        component: CourseStructureComponent
      },
      {
        path: 'setup_and_test_video',
        component: SetupAndTestVideoComponent
      },
      {
        path: 'film_and_edit',
        component: FilmAndEditComponent
      },
      {
        path: 'curriculum',
        component: CurriculumComponent
      },
      {
        path: 'captions',
        component: CaptionsComponent
      },
      {
        path: 'course_landing_pages',
        component: CourseLandingPagesComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'promotions',
        component: PromotionsComponent
      },
      {
        path: 'course_messages',
        component: CourseMessagesComponent
      },
      {
        path: 'setting',
        component: SettingComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
