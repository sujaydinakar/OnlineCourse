import { ChangeDetectionStrategy, Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { generateKeywords } from 'src/app/services/generator/generate-keywords.service';

import { CategoryStore } from 'src/app/stores/category.store';
import { CourseStore } from 'src/app/stores/course.store';
import { CourseLanguageStore } from 'src/app/stores/language.store';
import { CourseLevelStore } from 'src/app/stores/level.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';
import { UserStore } from 'src/app/stores/user.store';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

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
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes',this.courseStore.TempCourse);
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

  courseImageChanged(event) {
    this.selectedImage = event.currentFiles[0];
    this.uploadFilesToFirebase(event.currentFiles[0], 'course_image_thumbnail');
  }

  courseVideoChanged(event) {
    this.selectedVideo = event.currentFiles[0];
    this.uploadVideosToFirebase(event.currentFiles[0], 'course_promotion_video');
  }

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

  // deleteFile(fileUpload: File): void {
  //   this.deleteFileDatabase(fileUpload.key)
  //     .then(() => {
  //       this.deleteFileStorage(fileUpload.name);
  //     })
  //     .catch(error => console.log(error));
  // }
  
  // private deleteFileDatabase(key: string): void {
  //   return this.db.list(this.basePath).remove(key);
  // }
  
  // private deleteFileStorage(name: string): void {
  //   const storageRef = this.storage.ref(this.basePath);
  //   storageRef.child(name).delete();
  // }
}
