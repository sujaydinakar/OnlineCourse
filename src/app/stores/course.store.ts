import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ICourse } from "../models/course.model";
import { CategoryMappingService } from "../services/mapping/category-mapping.service";
import { LevelMappingService } from "../services/mapping/level-mapping.service";
import { LanguageMappingService } from "../services/mapping/language-mapping.service";
import { UserStore } from "./user.store";

@Injectable({providedIn:'root'})
export class CourseStore {
  @observable public Courses: Array<ICourse>;
  @observable public Course: ICourse;

  @observable public TempCourse: ICourse;

  @observable public latestCheckpoint: '';

  constructor(
    private afs: AngularFirestore,

    private userStore: UserStore, 

    private levelMapping: LevelMappingService,
    private categoryMapping: CategoryMappingService,
    private languageMapping: LanguageMappingService,
  ) {
    this.TempCourse = new ICourse();
  }

  @action
  getCourses() {
    this.afs.collection('courses', ref => ref.where('isDelete', '==', false)).valueChanges().subscribe((data: any) => {
      this.Courses = data
    });
  }

  @action
  getCourseByKey(courseKey: string) {
    this.afs.collection('courses').doc(courseKey).valueChanges().subscribe((data: any) => {
      this.TempCourse = data;
    });
  }

  @action
  getCourseByKey_2(courseKey: string, callback) {
    this.afs.collection('courses').doc(courseKey).valueChanges().subscribe((data: any) => {
      this.TempCourse = data;

      callback(data);
    });
  }

  @action
  addCourse(courseData: ICourse) {
    const key = this.afs.createId();

    this.afs.collection('courses').doc(key).set({
      ...courseData,

      key,

      status: {
        key: '1',
        text: 'Published'
      },
      isDelete: false,

      category: this.categoryMapping.mapCategory(courseData.category),
      subcategory: this.categoryMapping.mapCategory(courseData.subcategory),
      level: this.levelMapping.mapLevel(courseData.level),
      language: this.languageMapping.mapLanguage(courseData.language),

      createdAt: new Date(),
      createdBy: this.userStore.User,
      updatedAt: new Date(),
      updatedBy: this.userStore.User,
    });

    this.TempCourse = {
      ...courseData,

      key,

      status: {
        key: '1',
        text: 'Published'
      },
      isDelete: false,

      category: this.categoryMapping.mapCategory(courseData.category),
      subcategory: this.categoryMapping.mapCategory(courseData.subcategory),
      level: this.levelMapping.mapLevel(courseData.level),
      language: this.languageMapping.mapLanguage(courseData.language),

      createdAt: new Date(),
      createdBy: this.userStore.User,
      updatedAt: new Date(),
      updatedBy: this.userStore.User,
    }
  }

  @action
  updatedCourse(courseData: ICourse) {
    this.afs.collection('courses').doc(courseData.key).update({
      ...courseData,

      category: this.categoryMapping.mapCategory(courseData.category),
      subcategory: this.categoryMapping.mapCategory(courseData.subcategory),
      level: this.levelMapping.mapLevel(courseData.level),
      language: this.languageMapping.mapLanguage(courseData.language),
      
      updatedAt: new Date(),
      updatedBy: this.userStore.User,
    });
  }

  @action
  submitSaveCourse() {
    if(this.TempCourse.key === null)
      this.addCourse(this.TempCourse);
    else 
      this.updatedCourse(this.TempCourse);
  }
}
