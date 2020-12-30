import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { BarRatingModule } from "ngx-bar-rating";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/frontend/main/main.component';
import { HeaderComponent } from './shared/frontend/header/header.component';
import { FooterComponent } from './shared/frontend/footer/footer.component';
import { HomeComponent } from './pages/frontend/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { MobxAngularModule } from 'mobx-angular';
import { ImageSwiperComponent } from './components/frontend/image-swiper/image-swiper.component';
import { StudentRecommendationComponent } from './components/frontend/student-recommendation/student-recommendation.component';
import { StudentsAreViewingComponent } from './components/frontend/students-are-viewing/students-are-viewing.component';
import { SubjectCategoriesComponent } from './components/frontend/subject-categories/subject-categories.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListTopicByCategoryComponent } from './pages/frontend/list-topic-by-category/list-topic-by-category.component';
import { SwiperByTabComponent } from './components/frontend/for-sub-pages/swiper-by-tab/swiper-by-tab.component';
import { FeaturedCoursesComponent } from './components/frontend/for-sub-pages/featured-courses/featured-courses.component';
import { PopularTopicsComponent } from './components/frontend/for-sub-pages/popular-topics/popular-topics.component';
import { PopularInstructorsComponent } from './components/frontend/for-sub-pages/popular-instructors/popular-instructors.component';
import { AllBlahCoursesComponent } from './components/frontend/for-sub-pages/all-blah-courses/all-blah-courses.component';
import { CoursesToGetYouStartedComponent } from './components/frontend/for-sub-pages/courses-to-get-you-started/courses-to-get-you-started.component';
import { Main2Component } from './layout/frontend/main2/main2.component';
import { TopicDescriptionComponent } from './pages/frontend/topic-description/topic-description.component';
import { TopicIntroHeaderComponent } from './components/frontend/for-description-pages/topic-intro-header/topic-intro-header.component';
import { TopicContentDescriptionComponent } from './components/frontend/for-description-pages/topic-content-description/topic-content-description.component';
import { InstructorDashboardComponent } from './layout/backend/instructor-dashboard/instructor-dashboard.component';
import { InstructorCreatingCourseComponent } from './layout/backend/instructor-creating-course/instructor-creating-course.component';
import { InstructorSidebarComponent } from './shared/backend/instructor-sidebar/instructor-sidebar.component';
import { InstructorFooterComponent } from './shared/backend/instructor-footer/instructor-footer.component';
import { InstructorHeaderComponent } from './shared/backend/instructor-header/instructor-header.component';
import { InstructorHomeComponent } from './pages/backend/instructor-home/instructor-home.component';
import { CreatingNewCourseHeaderComponent } from './shared/backend/creating-new-course-header/creating-new-course-header.component';

import { TargetYourStudentsComponent } from './pages/backend/creating-course/target-your-students/target-your-students.component';
import { CourseStructureComponent } from './pages/backend/creating-course/course-structure/course-structure.component';
import { SetupAndTestVideoComponent } from './pages/backend/creating-course/setup-and-test-video/setup-and-test-video.component';
import { FilmAndEditComponent } from './pages/backend/creating-course/film-and-edit/film-and-edit.component';
import { CurriculumComponent } from './pages/backend/creating-course/curriculum/curriculum.component';
import { CourseLandingPagesComponent } from './pages/backend/creating-course/course-landing-pages/course-landing-pages.component';
import { CaptionsComponent } from './pages/backend/creating-course/captions/captions.component';
import { PricingComponent } from './pages/backend/creating-course/pricing/pricing.component';
import { PromotionsComponent } from './pages/backend/creating-course/promotions/promotions.component';
import { CourseMessagesComponent } from './pages/backend/creating-course/course-messages/course-messages.component';
import { CreatingNewCourseSidebarComponent } from './shared/backend/creating-new-course-sidebar/creating-new-course-sidebar.component';
import { QuillModule } from 'ngx-quill'


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    ImageSwiperComponent,
    StudentRecommendationComponent,
    StudentsAreViewingComponent,
    SubjectCategoriesComponent,
    ListTopicByCategoryComponent,
    SwiperByTabComponent,
    FeaturedCoursesComponent,
    PopularTopicsComponent,
    PopularInstructorsComponent,
    AllBlahCoursesComponent,
    CoursesToGetYouStartedComponent,
    Main2Component,
    TopicDescriptionComponent,
    TopicIntroHeaderComponent,
    TopicContentDescriptionComponent,
    InstructorDashboardComponent,
    InstructorCreatingCourseComponent,
    InstructorSidebarComponent,
    InstructorFooterComponent,
    InstructorHeaderComponent,
    InstructorHomeComponent,
    CreatingNewCourseHeaderComponent,
    TargetYourStudentsComponent,
    CourseStructureComponent,
    SetupAndTestVideoComponent,
    FilmAndEditComponent,
    CurriculumComponent,
    CaptionsComponent,
    CourseLandingPagesComponent,
    PricingComponent,
    PromotionsComponent,
    CourseMessagesComponent,
    CreatingNewCourseSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MobxAngularModule,
    SwiperModule,
    BarRatingModule,
    FontAwesomeModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
