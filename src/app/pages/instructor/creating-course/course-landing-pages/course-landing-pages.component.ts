import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import * as Player from "@vimeo/player/dist/player.js";

import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';

import { CategoryStore } from 'src/app/stores/category.store';
import { CourseStore } from 'src/app/stores/course.store';
import { CourseLanguageStore } from 'src/app/stores/language.store';
import { CourseLevelStore } from 'src/app/stores/level.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { UserStore } from 'src/app/stores/user.store';
import { UploadingVideoService } from 'src/app/services/uploading_video/uploading-video.service';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-course-landing-pages',
  templateUrl: './course-landing-pages.component.html',
  styleUrls: ['./course-landing-pages.component.scss'],
})
export class CourseLandingPagesComponent implements OnInit {

  selectedImage: File;
  selectedVideo: File;

  courseId;
  courseLandingPageForm;

  downloadURL: string;
  imageFile: File;
  task: AngularFireUploadTask;
  percentage;

  downloadURL_ForVideo: string;
  imageFile_ForVideo: File;
  task_ForVideo: AngularFireUploadTask;
  percentage_ForVideo;

  constructor(
    private embedService: EmbedVideoService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFirestore,
    private storage: AngularFireStorage,

    private userStore: UserStore,
    public courseStore: CourseStore,
    public levelStore: CourseLevelStore,
    public categoryStore: CategoryStore,
    public languageStore: CourseLanguageStore,
    public subcategoryStore: SubCategoryStore,

    public uploadingVideoService: UploadingVideoService
  ) { 
    this.courseLandingPageForm = this.formBuilder.group({
      title: '',
      subtitle: '',
      description: '',
      language: '-- Select Language --',
      level: '-- Select Level --',
      category: '-- Select Category --',
      subcategory: '-- Select Subcategory --',
      primaryTaught: ''
    });
  }

  async ngOnInit(): Promise<void> {
    this.levelStore.getLevels();
    this.languageStore.getLanguages();
    this.categoryStore.getCategories();
    this.subcategoryStore.getSubCategories_2();

    this.activatedRoute.parent.params.subscribe(params => {
      this.courseId = params['courseId'];

      if(this.courseId !== 'new') {
        if(this.courseStore.TempCourse.key === null) {
          this.courseStore.getCourseByKey_2(this.courseId, (data) => {
            this.courseLandingPageForm.patchValue({
              title: data.title,
              subtitle: data.subtitle,
              description: data.description,
              language: data.language || '-- Select Language --',
              level: data.level || '-- Select Level --',
              category: data.category || '-- Select Category --',
              subcategory: data.subcategory || '-- Select Subcategory --',
              primaryTaught: data.primaryTaught
            });

            this.vimeo_uploadedVideoUrl = data.promotionVideoUrl;
          });
        } else {
          this.courseLandingPageForm.patchValue({
            title: this.courseStore.TempCourse.title,
            subtitle: this.courseStore.TempCourse.subtitle,
            description: this.courseStore.TempCourse.description,
            language: this.courseStore.TempCourse.language || '-- Select Language --',
            level: this.courseStore.TempCourse.level || '-- Select Level --',
            category: this.courseStore.TempCourse.category || '-- Select Category --',
            subcategory: this.courseStore.TempCourse.subcategory || '-- Select Subcategory --',
            primaryTaught: this.courseStore.TempCourse.primaryTaught
          });

          this.vimeo_uploadedVideoUrl = this.courseStore.TempCourse.promotionVideoUrl;
        }
      }
    });

    this.courseLandingPageForm.valueChanges.subscribe((value) => {
      let data = this.courseStore.TempCourse;
      const keywords = generateKeywords([ data.title || '' ]);

      this.courseStore.TempCourse = {
        ...data,
        ...value, 

        keywords,
        createdAt: new Date(),
        createdBy: this.userStore.User,
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      }
    });

    this.uploadingVideoService.vimeoLinkObs.subscribe(
      data => {
        this.vimeo_uploadedVideoUrl = data;
      }, error => {
        throw new Error(error);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',this.courseStore.TempCourse);
  }

  ngAfterViewInit() {

  }

  selectParentCategoryChanged(event) {
    this.subcategoryStore.getSubCategories(event.value.key);
  }

  txtCourseTitleChanged(event) {
    this.courseStore.TempCourse.title = event.target.value;
  }

  txtCourseSubTitleChanged(event) {
    this.courseStore.TempCourse.subtitle = event.target.value;
  }

  descriptionChangedEditor(event) {
    // console.log(event)

    // if(event.html !== undefined)
    //   this.courseStore.TempCourse.description = event.html;
  }

  compareFn(object1: any, object2: any) {
    return object1 && object2 ? object1.key === object2.key : object1 === object2;
  }

  onSubmit(formData) {
    console.log(formData)
  }

  // ------------------------------------------------------------------------------------------------------------

  courseImageChanged(event) {
    this.selectedImage = event.currentFiles[0];
    this.uploadFilesToFirebase(event.currentFiles[0], 'course_image_thumbnail');
  }

  courseVideoChanged(event) {
    this.selectedVideo = event.currentFiles[0];

    // this.uploadVideosToFirebase(event.currentFiles[0], 'course_promotion_video');

    this.vimeo_uploadedVideoName = this.selectedVideo.name;
    this.uploadVimeoVideo(this.selectedVideo);
  }

  // ------------------------------------------------------------------------------------------------------------

  uploadFilesToFirebase(item: File, basePath: string) {
    const filePath = `${basePath}/${Date.now()}_${item.name}`;
    const storageRef = this.storage.ref(filePath);

    this.task = this.storage.upload(filePath, item);
    this.task.percentageChanges().subscribe((data) => {
      this.percentage = data;
    });

    this.task.then((f) => {
      f.ref.getDownloadURL().then((downloadURL) => {
        let fileUploadedURL = downloadURL;
        let fileUploadedPath = filePath;

        this.courseStore.TempCourse = { 
          ...this.courseStore.TempCourse,
          courseImageUrl: fileUploadedURL,
          courseImagePath: fileUploadedPath
        }
      });
    });
  }

  uploadVideosToFirebase(item: File, basePath: string) {
    const filePath = `${basePath}/${Date.now()}_${item.name}`;
    const storageRef = this.storage.ref(filePath);

    this.task_ForVideo = this.storage.upload(filePath, item);
    this.task_ForVideo.percentageChanges().subscribe((data) => {
      this.percentage_ForVideo = data;
    });

    this.task_ForVideo.then((f) => {
      f.ref.getDownloadURL().then((downloadURL) => {
        let fileUploadedURL = downloadURL;
        let fileUploadedPath = filePath;

        this.courseStore.TempCourse = { 
          ...this.courseStore.TempCourse,
          promotionVideoUrl: fileUploadedURL,
          promotionVideoPath: fileUploadedPath
        }
      });
    });
  }

  formatPercentage(number) {
    return parseFloat(number).toFixed(2);
  }

  // ------------------------------------------------------------------------------------------------------------

  private data: any;

  vimeo_uploadedVideoUrl;
  vimeo_uploadedVideoPct;
  vimeo_uploadedVideoName;
  vimeo_uploadedVideoStatus = "Loading...";

  // Track upload status by tracking code
  // 0 - Not started
  // 1 - File chosen
  // 2 - Wrong file type
  // 3 - Uploading
  // 4 - Upload error
  // 5 - Upload complete
  
  public uploadStatus: Number = 0;

  uploadVimeoVideo(fileForUpload: File): void {
    this.uploadStatus = 1;

    if (fileForUpload === undefined) {
      console.log('No file selected!');
      return;
    }

    const isAccepted = this.checkAllowedType(fileForUpload.type);

    if (isAccepted) {
      this.uploadStatus = 1;

      const options = {
        // token: '2f72e3f8d1269d8f11c1387e272ef3d5',
        token: 'f94e5f0392297d6bb9ffcb297874583f',
        url: 'https://api.vimeo.com/me/videos',
        videoName: this.vimeo_uploadedVideoName,
        videoDescription: this.vimeo_uploadedVideoName + '\'s description'
      };

      this.uploadingVideoService.createVimeo(options, fileForUpload.size)
        .pipe(
          map(data => this.data = data),
          switchMap(
            () => {
              this.uploadingVideoService.updateVimeoLink(this.data.link);
              if (this.data.upload.size === fileForUpload.size) {
                return this.uploadingVideoService.vimeoUpload(this.data.upload.upload_link, fileForUpload);
              } else {
                this.uploadStatus = 4;
              }
            }
          )
        ).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.vimeo_uploadedVideoPct = Math.round(100 * event.loaded / event.total);
              this.uploadStatus = 3;
            } else if (event instanceof HttpResponse) {
              this.uploadStatus = 5;
              setTimeout(() => {
                this.uploadStatus = 0;
              }, 5000);
            }
          },
          (error) => {
            console.log('Upload Error:', error);
            this.uploadStatus = 4;
          }, () => {
            this.courseStore.TempCourse.promotionVideoUrl = this.vimeo_uploadedVideoUrl;
            this.vimeo_uploadedVideoStatus = 'Uploaded sucessfully!';
          }
        );
    } else {
      this.uploadStatus = 2;
    }
  }

  allowUpload(): void {
    this.uploadStatus = 0;
  }

  checkAllowedType(filetype: string): boolean {
    const allowed = ['mov', 'wmv', 'avi', 'flv', 'mp4'];
    const videoType = filetype.split('/').pop();
    return allowed.includes(videoType);
  }

  replaceVimeoURL(oldURL: string) {
    const result = this.embedService.embed(oldURL, {
      attr: { width: "100%", height: "260px" }
    });
    return result;
  }
}
