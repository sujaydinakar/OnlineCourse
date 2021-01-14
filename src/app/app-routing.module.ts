import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { AdminMainComponent } from './layout/admin/admin-main/admin-main.component';
import { InstructorCreatingCourseComponent } from './layout/instructor/instructor-creating-course/instructor-creating-course.component';
import { InstructorDashboardComponent } from './layout/instructor/instructor-dashboard/instructor-dashboard.component';
import { MainComponent } from './layout/student/main/main.component';
import { Main2Component } from './layout/student/main2/main2.component';
import { AdminAddCategoryComponent } from './pages/admin/course-category/admin-add-category/admin-add-category.component';
import { AdminCategoryComponent } from './pages/admin/course-category/admin-category/admin-category.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminInstructorComponent } from './pages/admin/admin-instructor/admin-instructor.component';
import { AdminSlideshowComponent } from './pages/admin/admin-slideshow/admin-slideshow.component';
import { CaptionsComponent } from './pages/instructor/creating-course/captions/captions.component';
import { CourseLandingPagesComponent } from './pages/instructor/creating-course/course-landing-pages/course-landing-pages.component';
import { CourseMessagesComponent } from './pages/instructor/creating-course/course-messages/course-messages.component';
import { CourseStructureComponent } from './pages/instructor/creating-course/course-structure/course-structure.component';
import { CurriculumComponent } from './pages/instructor/creating-course/curriculum/curriculum.component';
import { FilmAndEditComponent } from './pages/instructor/creating-course/film-and-edit/film-and-edit.component';
import { PricingComponent } from './pages/instructor/creating-course/pricing/pricing.component';
import { PromotionsComponent } from './pages/instructor/creating-course/promotions/promotions.component';
import { SettingComponent } from './pages/instructor/creating-course/setting/setting.component';
import { SetupAndTestVideoComponent } from './pages/instructor/creating-course/setup-and-test-video/setup-and-test-video.component';
import { TargetYourStudentsComponent } from './pages/instructor/creating-course/target-your-students/target-your-students.component';
import { InstructorHomeComponent } from './pages/instructor/instructor-home/instructor-home.component';
import { HomeComponent } from './pages/student/home/home.component';
import { ListTopicByCategoryComponent } from './pages/student/list-topic-by-category/list-topic-by-category.component';
import { TopicDescriptionComponent } from './pages/student/topic-description/topic-description.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { AdminSubcategoryComponent } from './pages/admin/course-subcategory/admin-subcategory/admin-subcategory.component';
import { AdminCourseTopicComponent } from './pages/admin/course-topic/admin-course-topic/admin-course-topic.component';
import { AdminCourseLevelComponent } from './pages/admin/course-level/admin-course-level/admin-course-level.component';

const redirectUnauthorizedAdminToLogin = () => redirectUnauthorizedTo(['/admin/login']);

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
    path: 'admin/login',
    component: AdminLoginComponent
  },
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedAdminToLogin },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'course-category',
        component: AdminCategoryComponent,
      },
      {
        path: 'course-subcategory/:key',
        component: AdminSubcategoryComponent,
      },
      {
        path: 'course-topic/:key1/:key2',
        component: AdminCourseTopicComponent,
      },
      {
        path: 'level',
        component: AdminCourseLevelComponent,
      },
      {
        path: 'slideshow',
        component: AdminSlideshowComponent,
      },
      {
        path: 'instructor',
        component: AdminInstructorComponent,
      },
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
