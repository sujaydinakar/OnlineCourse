import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { MainComponent } from './layout/student/main/main.component';
import { Main2Component } from './layout/student/main2/main2.component';
import { AdminMainComponent } from './layout/admin/admin-main/admin-main.component';
import { AdminMain2Component } from './layout/admin/admin-main2/admin-main2.component';
import { AdminMain3Component } from './layout/admin/admin-main3/admin-main3.component';
import { InstructorCreatingCourseComponent } from './layout/instructor/instructor-creating-course/instructor-creating-course.component';
import { InstructorDashboardComponent } from './layout/instructor/instructor-dashboard/instructor-dashboard.component';

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
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { AdminSubcategoryComponent } from './pages/admin/course-subcategory/admin-subcategory/admin-subcategory.component';
import { AdminCourseTopicComponent } from './pages/admin/course-topic/admin-course-topic/admin-course-topic.component';
import { AdminCourseLevelComponent } from './pages/admin/course-level/admin-course-level/admin-course-level.component';
import { AdminCourseLanguageComponent } from './pages/admin/course-language/admin-course-language/admin-course-language.component';
import { StudentLoginComponent } from './pages/auth/student-login/student-login.component';

import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { TabLayoutComponent } from './layout/tab-layout/tab-layout.component';
import { StudentGuardGuard } from './guards/student-guard.guard';
import { SecureUserInnerPagesGuard } from './guards/secure-user-inner-pages.guard';
import { LoggedInMainComponent } from './layout/student/logged-in-main/logged-in-main.component';
import { LoggedInMain2Component } from './layout/student/logged-in-main2/logged-in-main2.component';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';
import { StudentDashboardComponent } from './layout/student/student-dashboard/student-dashboard.component';
import { StudentCurriculumComponent } from './pages/student/viewing-course/student-curriculum/student-curriculum.component';
import { StudentViewingCourseComponent } from './layout/student/student-viewing-course/student-viewing-course.component';
import { StudentCourseDescriptionComponent } from './pages/student/viewing-course/student-course-description/student-course-description.component';
import { StudentPurchasingInformationComponent } from './pages/student/viewing-course/student-purchasing-information/student-purchasing-information.component';
import { StudentCourseOverviewComponent } from './pages/student/viewing-course/student-course-overview/student-course-overview.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';

const redirectUnauthorizedUserToLogin = () => redirectUnauthorizedTo(['/login']);
const redirectUnauthorizedAdminToLogin = () => redirectUnauthorizedTo(['/admin/login']);

const routes: Routes = [
  // default routes zone
  {
    path: '',
    canActivate: [SecureUserInnerPagesGuard],
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
    canActivate: [SecureUserInnerPagesGuard],
    component: Main2Component,
    children: [
      {
        path: 'course/:id',
        component: TopicDescriptionComponent
      }
    ]
  },
  // user login's routes zone
  {
    path: 'login',
    canActivate: [SecureUserInnerPagesGuard],
    component: StudentLoginComponent
  },
  {
    path: 'student/login',
    canActivate: [SecureUserInnerPagesGuard],
    component: StudentLoginComponent
  },
  // student's routes zone
  {
    path: 'student',
    component: LoggedInMainComponent,
    canActivate: [StudentGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedUserToLogin },
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
    path: 'student',
    component: LoggedInMain2Component,
    canActivate: [StudentGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedUserToLogin },
    children: [
      {
        path: 'course/:id',
        component: TopicDescriptionComponent
      }
    ]
  },
  {
    path: 'student',
    canActivate: [StudentGuardGuard],
    component: StudentDashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: StudentHomeComponent
      }
    ]
  },
  {
    path: 'viewing_course/:courseId',
    component: StudentViewingCourseComponent,
    canActivate: [StudentGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedUserToLogin },
    children: [
      {
        path: '',
        redirectTo: 'course_description',
        pathMatch: 'full'
      },
      {
        path: 'course_description',
        component: StudentCourseDescriptionComponent
      },
      {
        path: 'purchasing_information',
        component: StudentPurchasingInformationComponent
      },
      {
        path: 'course_overview',
        component: StudentCourseOverviewComponent
      },
      {
        path: 'course_curriculum',
        component: StudentCurriculumComponent
      },
    ]
  },
  // instructor's routes zone
  {
    path: 'instructor',
    component: InstructorDashboardComponent,
    canActivate: [StudentGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedUserToLogin },
    children: [
      {
        path: '',
        component: InstructorHomeComponent
      }
    ]
  },
  {
    path: 'instructor/dashboard',
    component: InstructorDashboardComponent,
    canActivate: [StudentGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedUserToLogin },
    children: [
      {
        path: '',
        component: InstructorHomeComponent
      }
    ]
  },
  {
    path: 'create_course/:courseId',
    component: InstructorCreatingCourseComponent,
    canActivate: [StudentGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedUserToLogin },
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
  // admin login's routes zone
  {
    path: 'admin/login',
    component: AdminLoginComponent
  },
  // admin's routes zone
  {
    path: 'admin',
    component: AdminMain3Component,
    canActivate: [AdminGuardGuard],
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
        component: TabLayoutComponent,
        children: [
          { path: '', redirectTo: 'data', pathMatch: 'full' },
          { path: 'data', component: AdminCategoryComponent },
          { path: 'subcategory/:key', component: AdminSubcategoryComponent },
          { path: 'topic/:key1/:key2', component: AdminCourseTopicComponent },
        ]
      },
      {
        path: 'level',
        component: AdminCourseLevelComponent,
      },
      {
        path: 'language',
        component: AdminCourseLanguageComponent,
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
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
