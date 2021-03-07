import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

import { QuillModule } from 'ngx-quill';
import { EmbedVideo } from 'ngx-embed-video';
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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { VimeModule } from '@vime/angular';
import { MobxAngularModule } from 'mobx-angular';

import { MaterialModule } from './material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { ScrollableDirective } from './directives/scrollable.directive';
import { NgPipesModule } from 'ngx-pipes';

import { MainComponent } from './layout/student/main/main.component';
import { HeaderComponent } from './shared/student/header/header.component';
import { FooterComponent } from './shared/student/footer/footer.component';
import { HomeComponent } from './pages/student/home/home.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { TrustedURLServicePipe } from './pipes/trusted-urlservice.pipe';
import { CourseSectionBlockComponent } from './pages/instructor/creating-course/components/course-section-block/course-section-block.component';
import { CourseElementBlockComponent } from './pages/instructor/creating-course/components/course-element-block/course-element-block.component';
import { ViewCourseElementDialogComponent } from './pages/instructor/creating-course/components/view-course-element-dialog/view-course-element-dialog.component';
import { EditCourseSectionDialogComponent } from './pages/instructor/creating-course/components/edit-course-section-dialog/edit-course-section-dialog.component';
import { ViewCourseSectionDialogComponent } from './pages/instructor/creating-course/components/view-course-section-dialog/view-course-section-dialog.component';
import { EditCourseElementDialogComponent } from './pages/instructor/creating-course/components/edit-course-element-dialog/edit-course-element-dialog.component';

import { AlertMessageDialogComponent } from './shared/dialog/alert-message-dialog/alert-message-dialog.component';
import { ConfirmMessageDialogComponent } from './shared/dialog/confirm-message-dialog/confirm-message-dialog.component';
import { AdminMainHeaderComponent } from './shared/admin/admin-main-header/admin-main-header.component';
import { AdminMainFooterComponent } from './shared/admin/admin-main-footer/admin-main-footer.component';
import { AdminMainSidebarComponent } from './shared/admin/admin-main-sidebar/admin-main-sidebar.component';
import { AdminMain3Component } from './layout/admin/admin-main3/admin-main3.component';
import { AdminMainCommandBarComponent } from './shared/admin/admin-main-command-bar/admin-main-command-bar.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';
import { TabLayoutComponent } from './layout/tab-layout/tab-layout.component';
import { LoggedInMainComponent } from './layout/student/logged-in-main/logged-in-main.component';
import { LoggedInMain2Component } from './layout/student/logged-in-main2/logged-in-main2.component';
import { LoggedInHeaderComponent } from './shared/student/logged-in-header/logged-in-header.component';
import { StudentHomeComponent } from './pages/student/student-home/student-home.component';
import { ViewingCourseHeaderComponent } from './shared/student/viewing-course-header/viewing-course-header.component';
import { ViewingCourseSidebarComponent } from './shared/student/viewing-course-sidebar/viewing-course-sidebar.component';
import { StudentFooterComponent } from './shared/student/student-footer/student-footer.component';
import { StudentHeaderComponent } from './shared/student/student-header/student-header.component';
import { StudentSidebarComponent } from './shared/student/student-sidebar/student-sidebar.component';
import { StudentViewingCourseComponent } from './layout/student/student-viewing-course/student-viewing-course.component';
import { StudentDashboardComponent } from './layout/student/student-dashboard/student-dashboard.component';
import { StudentCurriculumComponent } from './pages/student/viewing-course/student-curriculum/student-curriculum.component';
import { StudentCourseDescriptionComponent } from './pages/student/viewing-course/student-course-description/student-course-description.component';
import { StudentPurchasingInformationComponent } from './pages/student/viewing-course/student-purchasing-information/student-purchasing-information.component';
import { StudentCourseOverviewComponent } from './pages/student/viewing-course/student-course-overview/student-course-overview.component';
import { StudentCourseSectionBlockComponent } from './pages/student/viewing-course/components/student-course-section-block/student-course-section-block.component';
import { StudentCourseElementBlockComponent } from './pages/student/viewing-course/components/student-course-element-block/student-course-element-block.component';
import { ViewStudentCourseElementDialogComponent } from './pages/student/viewing-course/components/view-student-course-element-dialog/view-student-course-element-dialog.component';
import { ViewStudentCourseSectionDialogComponent } from './pages/student/viewing-course/components/view-student-course-section-dialog/view-student-course-section-dialog.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    ScrollableDirective,
    
    GetDocPipe,
    TrustedURLServicePipe,

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
    AdminEditCourseLanguageComponent,

    CourseSectionBlockComponent,
    CourseElementBlockComponent,
    ViewCourseElementDialogComponent,
    EditCourseElementDialogComponent,
    ViewCourseSectionDialogComponent,
    EditCourseSectionDialogComponent,
    AlertMessageDialogComponent,
    ConfirmMessageDialogComponent,
    AdminMainHeaderComponent,
    AdminMainFooterComponent,
    AdminMainSidebarComponent,
    AdminMain3Component,
    AdminMainCommandBarComponent,
    PrimaryButtonComponent,
    TabLayoutComponent,
    LoggedInMainComponent,
    LoggedInMain2Component,
    LoggedInHeaderComponent,
    StudentHomeComponent,
    ViewingCourseHeaderComponent,
    ViewingCourseSidebarComponent,
    StudentFooterComponent,
    StudentHeaderComponent,
    StudentSidebarComponent,
    StudentViewingCourseComponent,
    StudentDashboardComponent,
    StudentCurriculumComponent,
    StudentCourseDescriptionComponent,
    StudentPurchasingInformationComponent,
    StudentCourseOverviewComponent,
    StudentCourseSectionBlockComponent,
    StudentCourseElementBlockComponent,
    ViewStudentCourseElementDialogComponent,
    ViewStudentCourseSectionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
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
    EmbedVideo.forRoot(),
    SkeletonModule,
    FileUploadModule, 
    HttpClientModule,
    TableModule,
    NgxDatatableModule,
    SocialLoginModule,
    VimeModule,
    NgPipesModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'clientId'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class AppModule { }
