import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { ICourse } from "../models/course.model";
import { CategoryMappingService } from "../services/mapping/category-mapping.service";
import { LevelMappingService } from "../services/mapping/level-mapping.service";
import { LanguageMappingService } from "../services/mapping/language-mapping.service";
import { UserStore } from "./user.store";
import { AngularFireStorage } from "@angular/fire/storage";
import { pushToArray } from "../services/mapping/user-mapping.service";
import { errorMonitor } from "events";
import { CourseMappingService } from "../services/mapping/course-mapping.service";

@Injectable({providedIn:'root'})
export class CourseStore {
  @observable public Courses: Array<ICourse>;
  @observable public Course: ICourse;
  @observable public CourseSections: Array<any>;
  @observable public CourseSection: any;

  @observable public TempCourseSections: Array<any>;
  @observable public TempCourse: ICourse;

  @observable public tempAddSectionNumber = 0;
  @observable public tempAddElementNumber = 0;
  @observable public latestCheckpoint: '';

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,

    private userStore: UserStore, 

    private levelMapping: LevelMappingService,
    private categoryMapping: CategoryMappingService,
    private languageMapping: LanguageMappingService,
    private courseMapping: CourseMappingService,
  ) {
    this.TempCourse = new ICourse();
  }

  @action
  getCourses() {
    try {
      this.afs.collection('courses', ref => ref.where('isDelete', '==', false)).valueChanges().subscribe((data: any) => {
        this.Courses = data
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  getCourseByKey(courseKey: string) {
    try {
      this.afs.collection('courses').doc(courseKey).valueChanges().subscribe((data: any) => {
        this.TempCourse = data;
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  getCourseByKey_2(courseKey: string, callback) {
    try {
      this.afs.collection('courses').doc(courseKey).valueChanges().subscribe((data: any) => {
        this.TempCourse = data;
  
        callback(data);
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  addCourse(courseData: ICourse) {
    try {
      const _key = this.afs.createId();

      const finalData = {
        ...courseData,

        _key,

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
      };

      this.afs.collection('courses').doc(_key).set({
        ...finalData
      }).then(() => {
        if(this.TempCourseSections !== undefined) {
          this.TempCourseSections.map((item, index) => {
            const key = this.afs.createId();
            this.addCourseSection(_key, { ...item, key }, index);
            return { ...item, key };
          });
        }
      });

      this.TempCourse = finalData;
    } catch(error) {
      console.log(error)
    }
  }

  @action
  updatedCourse(courseData: ICourse) {
    try {
      this.afs.collection('courses').doc(courseData.key).update({
        ...courseData,
  
        category: this.categoryMapping.mapCategory(courseData.category),
        subcategory: this.categoryMapping.mapCategory(courseData.subcategory),
        level: this.levelMapping.mapLevel(courseData.level),
        language: this.languageMapping.mapLanguage(courseData.language),
        
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      }).then(() => {
        this.TempCourseSections.map((item, index) => {
          if(!item.key) {
            const key = this.afs.createId();
            this.addCourseSection(courseData.key, { ...item, key }, index);
            return { ...item, key };
          } else {
            this.updatedCourseSection(courseData.key, item, index);
            return { ...item };
          }
        });
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  submitSaveCourse() {
    if(this.TempCourse.key === null)
      this.addCourse(this.TempCourse);
    else 
      this.updatedCourse(this.TempCourse);
  }

  @action
  deleteFileFromFirebase(imagePath) {
    try {
      this.storage.ref(imagePath).delete();
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  async getSections(courseKey: string) {
    try {
      const data = pushToArray(await this.afs.firestore.collection('sections').where('courseKey', '==', courseKey).orderBy('order', 'asc').get());
      this.CourseSections = data;
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  async getCourseSections_2(courseKey: string) {    
    try {
      const data = pushToArray(await this.afs.collection('sections', ref => ref.where('courseKey', '==', courseKey).orderBy('order', 'asc')).get().toPromise());
      return data;
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  addCourseSection(courseKey: string, sectionData: any, courseIndex: any) {
    try {
      sectionData = this.courseMapping.mapSection(sectionData);
      this.afs.collection('sections').doc(sectionData.key).set({
        ...sectionData,
  
        courseKey: courseKey,
  
        status: {
          key: '1',
          text: 'Published'
        },
        isDelete: false,
  
        createdAt: new Date(),
        createdBy: this.userStore.User,
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      }).then(() => {
        this.TempCourseSections[courseIndex].elements = this.TempCourseSections[courseIndex].elements.map((item, index) => {
          if(item.key === undefined) {
            const key = this.afs.createId();
            const data = { ...item, key };
            this.addCourseElement(courseKey, sectionData.key, data);
            return data;
          }
        });
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  updatedCourseSection(courseKey: string, courseSectionData: any, courseIndex: any) {
    // const newData = Object.assign(courseSectionData, { updatedAt: new Date(), updatedBy: this.userStore.User});
    // const clone =  Object.create(courseSectionData);

    try {
      courseSectionData = this.courseMapping.mapSection(courseSectionData);
      this.afs.collection('sections').doc(courseSectionData.key).update({
        ...courseSectionData,

        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      }).then(() => {
        this.TempCourseSections[courseIndex].elements.map((item, index) => {
          if(item.key === undefined) {
            const key = this.afs.createId();
            const data = { ...item, key };
            this.addCourseElement(courseKey, courseSectionData.key, data);
            return data;
          } else {
            this.editCourseElement(item);
            return item;
          }
        });
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  updatedAllCourseSections(courseKey: string, courseSectionsData: Array<any>) {
    try {
      courseSectionsData.forEach((courseSectionData) => {
        this.afs.collection('sections').doc(courseSectionData.key).update({
          ...courseSectionData,

          updatedAt: new Date(),
          updatedBy: this.userStore.User,
        });
      })
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  addCourseElement(courseKey: string, sectionKey: string, sectionData: any) {    
    try {
      this.afs.collection('elements').doc(sectionData.key).set({
        ...sectionData,

        courseKey: courseKey,
        sectionKey: sectionKey,

        status: {
          key: '1',
          text: 'Published'
        },
        isDelete: false,

        createdAt: new Date(),
        createdBy: this.userStore.User,
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  editCourseElement(elementData: ICourse) {
    try {
      this.afs.collection('elements').doc(elementData.key).update({
        ...elementData,
        
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  getCourseElements(courseKey: string, sectionKey: string) {
    try {
      this.afs.collection('elements', ref => ref.where('courseKey', '==', courseKey).where('sectionKey', '==', sectionKey).orderBy('order', 'asc')).valueChanges().subscribe((data: any) => {
        this.CourseSections = data;
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  async getCourseElementsAndAddToEachSection(courseKey: string) {
    try {
      const data = pushToArray(await this.afs.firestore.collection('elements').where('courseKey', '==', courseKey).orderBy('order', 'asc').get())

      this.TempCourseSections.map((item) => {
        let temp_elements = [];
        let temp_element;
        item.elements = temp_elements;
        
        data.forEach((jtem) => {
          if(item.key === jtem.sectionKey) {
            temp_element = this.courseMapping.mapElement(jtem);
            temp_elements.push(temp_element);
          }
        });

        item.elements.push();
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  async getCourseElements_2(courseKey: string, sectionKey: string) {
    try {
      const data = pushToArray(await this.afs.collection('elements', ref => ref.where('courseKey', '==', courseKey).where('sectionKey', '==', sectionKey).orderBy('order', 'asc')).get().toPromise())
      return data;
    } catch(error) {
      console.log(error)
    }
  }
}
