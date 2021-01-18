import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { QuillModule } from 'ngx-quill';
import { BarRatingModule } from "ngx-bar-rating";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload'; 
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { environment } from 'src/environments/environment';
import { ScrollableDirective } from './directives/scrollable.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/student/main/main.component';
import { HeaderComponent } from './shared/student/header/header.component';
import { FooterComponent } from './shared/student/footer/footer.component';
import { HomeComponent } from './pages/student/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { MobxAngularModule } from 'mobx-angular';
import { ImageSwiperComponent } from './components/student/image-swiper/image-swiper.component';
import { StudentRecommendationComponent } from './components/student/student-recommendation/student-recommendation.component';
import { StudentsAreViewingComponent } from './components/student/students-are-viewing/students-are-viewing.component';
import { SubjectCategoriesComponent } from './components/student/subject-categories/subject-categories.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListTopicByCategoryComponent } from './pages/student/list-topic-by-category/list-topic-by-category.component';
import { SwiperByTabComponent } from './components/student/for-sub-pages/swiper-by-tab/swiper-by-tab.component';
import { FeaturedCoursesComponent } from './components/student/for-sub-pages/featured-courses/featured-courses.component';
import { PopularTopicsComponent } from './components/student/for-sub-pages/popular-topics/popular-topics.component';
import { PopularInstructorsComponent } from './components/student/for-sub-pages/popular-instructors/popular-instructors.component';
import { AllBlahCoursesComponent } from './components/student/for-sub-pages/all-blah-courses/all-blah-courses.component';
import { CoursesToGetYouStartedComponent } from './components/student/for-sub-pages/courses-to-get-you-started/courses-to-get-you-started.component';
import { Main2Component } from './layout/student/main2/main2.component';
import { TopicDescriptionComponent } from './pages/student/topic-description/topic-description.component';
import { TopicIntroHeaderComponent } from './components/student/for-description-pages/topic-intro-header/topic-intro-header.component';
import { TopicContentDescriptionComponent } from './components/student/for-description-pages/topic-content-description/topic-content-description.component';
import { InstructorDashboardComponent } from './layout/instructor/instructor-dashboard/instructor-dashboard.component';
import { InstructorCreatingCourseComponent } from './layout/instructor/instructor-creating-course/instructor-creating-course.component';
import { InstructorSidebarComponent } from './shared/instructor/instructor-sidebar/instructor-sidebar.component';
import { InstructorFooterComponent } from './shared/instructor/instructor-footer/instructor-footer.component';
import { InstructorHeaderComponent } from './shared/instructor/instructor-header/instructor-header.component';
import { InstructorHomeComponent } from './pages/instructor/instructor-home/instructor-home.component';
import { CreatingNewCourseHeaderComponent } from './shared/instructor/creating-new-course-header/creating-new-course-header.component';

import { TargetYourStudentsComponent } from './pages/instructor/creating-course/target-your-students/target-your-students.component';
import { CourseStructureComponent } from './pages/instructor/creating-course/course-structure/course-structure.component';
import { SetupAndTestVideoComponent } from './pages/instructor/creating-course/setup-and-test-video/setup-and-test-video.component';
import { FilmAndEditComponent } from './pages/instructor/creating-course/film-and-edit/film-and-edit.component';
import { CurriculumComponent } from './pages/instructor/creating-course/curriculum/curriculum.component';
import { CourseLandingPagesComponent } from './pages/instructor/creating-course/course-landing-pages/course-landing-pages.component';
import { CaptionsComponent } from './pages/instructor/creating-course/captions/captions.component';
import { PricingComponent } from './pages/instructor/creating-course/pricing/pricing.component';
import { PromotionsComponent } from './pages/instructor/creating-course/promotions/promotions.component';
import { CourseMessagesComponent } from './pages/instructor/creating-course/course-messages/course-messages.component';
import { CreatingNewCourseSidebarComponent } from './shared/instructor/creating-new-course-sidebar/creating-new-course-sidebar.component';
import { AdminMainComponent } from './layout/admin/admin-main/admin-main.component';
import { AdminMain2Component } from './layout/admin/admin-main2/admin-main2.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminSidebarComponent } from './shared/admin/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './shared/admin/admin-footer/admin-footer.component';
import { AdminAddCategoryComponent } from './pages/admin/course-category/admin-add-category/admin-add-category.component';
import { AdminSlideshowComponent } from './pages/admin/admin-slideshow/admin-slideshow.component';
import { AdminInstructorComponent } from './pages/admin/admin-instructor/admin-instructor.component';
import { AdminCategoryComponent } from './pages/admin/course-category/admin-category/admin-category.component'

import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { StudentLoginComponent } from './pages/auth/student-login/student-login.component';
import { AdminEditCategoryComponent } from './pages/admin/course-category/admin-edit-category/admin-edit-category.component';
import { AdminConfirmationDialogComponent } from './shared/admin/admin-confirmation-dialog/admin-confirmation-dialog.component';
import { AdminAddSubcategoryComponent } from './pages/admin/course-subcategory/admin-add-subcategory/admin-add-subcategory.component';
import { AdminSubcategoryComponent } from './pages/admin/course-subcategory/admin-subcategory/admin-subcategory.component';
import { AdminEditSubcategoryComponent } from './pages/admin/course-subcategory/admin-edit-subcategory/admin-edit-subcategory.component';
import { AdminEditCourseTopicComponent } from './pages/admin/course-topic/admin-edit-course-topic/admin-edit-course-topic.component';
import { AdminAddCourseTopicComponent } from './pages/admin/course-topic/admin-add-course-topic/admin-add-course-topic.component';
import { AdminCourseTopicComponent } from './pages/admin/course-topic/admin-course-topic/admin-course-topic.component';
import { GetDocPipe } from './pipes/get-doc.pipe';
import { AdminCourseLevelComponent } from './pages/admin/course-level/admin-course-level/admin-course-level.component';
import { AdminAddCourseLevelComponent } from './pages/admin/course-level/admin-add-course-level/admin-add-course-level.component';
import { AdminEditCourseLevelComponent } from './pages/admin/course-level/admin-edit-course-level/admin-edit-course-level.component';
import { AdminCourseLanguageComponent } from './pages/admin/course-language/admin-course-language/admin-course-language.component';
import { AdminAddCourseLanguageComponent } from './pages/admin/course-language/admin-add-course-language/admin-add-course-language.component';
import { AdminEditCourseLanguageComponent } from './pages/admin/course-language/admin-edit-course-language/admin-edit-course-language.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    ScrollableDirective,
    GetDocPipe,

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
    CreatingNewCourseSidebarComponent,
    AdminMainComponent,
    AdminMain2Component,
    AdminHomeComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
    AdminAddCategoryComponent,
    AdminSlideshowComponent,
    AdminInstructorComponent,
    AdminCategoryComponent,
    AdminLoginComponent,
    StudentLoginComponent,
    AdminEditCategoryComponent,
    AdminConfirmationDialogComponent,
    
    AdminAddSubcategoryComponent,
    AdminSubcategoryComponent,
    AdminEditSubcategoryComponent,

    AdminEditCourseTopicComponent,
    AdminAddCourseTopicComponent,
    AdminCourseTopicComponent,

    AdminCourseLevelComponent,
    AdminAddCourseLevelComponent,
    AdminEditCourseLevelComponent,

    AdminCourseLanguageComponent,
    AdminAddCourseLanguageComponent,
    AdminEditCourseLanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ScrollingModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

    MobxAngularModule,
    SwiperModule,
    BarRatingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MobxAngularModule,
    QuillModule.forRoot(),
    SkeletonModule,
    FileUploadModule, 
    HttpClientModule,
    TableModule,
    NgxDatatableModule
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
