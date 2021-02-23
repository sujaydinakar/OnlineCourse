import { action, observable } from "mobx";
import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";

import { ICourse } from "../models/course.model";

import { UserStore } from "./user.store";

import { CategoryMappingService } from "../services/mapping/category-mapping.service";
import { LevelMappingService } from "../services/mapping/level-mapping.service";
import { LanguageMappingService } from "../services/mapping/language-mapping.service";
import { pushToArray, pushToObject } from "../services/mapping/user-mapping.service";
import { CourseMappingService } from "../services/mapping/course-mapping.service";

@Injectable({providedIn:'root'})
export class CourseStore {
  @observable public Courses: Array<ICourse>;
  @observable public Course: ICourse;
  @observable public CourseSections: Array<any>;
  @observable public CourseSection: any;
  @observable public CourseElements: Array<any>;
  @observable public CourseElement: any;

  @observable public TempCourseSections: Array<any>;
  @observable public TempCourseElements: Array<any>;
  @observable public TempCourse: any;

  @observable public tempInsertedSections: Array<any> = [];
  @observable public tempInsertedElements: Array<any> = [];
  @observable public tempUpdatedSections: Array<any> = [];
  @observable public tempUpdatedElements: Array<any> = [];
  @observable public tempDeletedSections: Array<any> = [];
  @observable public tempDeletedElements: Array<any> = [];

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
  async getCourseByKey(courseKey: string) {
    // try {
    //   this.afs.collection('courses').doc(courseKey).valueChanges().subscribe((data: any) => {
    //     this.TempCourse = data;
    //     this.getCourseSections(data.key)
    //   });
    // } catch(error) {
    //   console.log(error)
    // }

    try {
      const data = pushToObject(await this.afs.collection('courses').doc(courseKey).get().toPromise());
      this.TempCourse = data;
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

        key: _key,

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
        this.TempCourseSections?.map((item, index) => {
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
  deleteCourse(courseData: any) {
    try {
      this.afs.collection(`courses`).doc(courseData.key).delete();
      this.deleteCourseSectionByCourseKey(courseData);
    } catch (error) {
      console.log(error)
    }
  }

  @action
  submitSaveCourse() {
    if (this.TempCourse.key === null) {
      this.addCourse(this.TempCourse);
    } else {
      this.updatedCourse(this.TempCourse);
      
      this.tempDeletedSections.forEach((item) => this.deleteCourseSectionBySectionKey(item));
      this.tempDeletedElements.forEach((item) => this.deleteCourseElementByElementKey(item));
    }
  }

  @action
  deleteFileFromFirebase(filePath) {
    try {
      this.storage.ref(filePath).delete();
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  async getCourseSections(courseKey: string) {
    try {
      // const data = pushToArray(await this.afs.firestore.collection('sections').where('courseKey', '==', courseKey).orderBy('order', 'asc').get());
      const data = pushToArray(await this.afs.collection('sections', ref => ref.where('courseKey', '==', courseKey).orderBy('order', 'asc')).get().toPromise());
      console.log(data)
      this.TempCourseSections = data;
      this.getCourseElementsAndAddToEachSection(courseKey);
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
      let isSectionDeleted = this.tempDeletedSections.some((item) => courseSectionData.key === item.key);

      if(!isSectionDeleted) {
        courseSectionData = this.courseMapping.mapSection(courseSectionData);
        this.afs.collection('sections').doc(courseSectionData.key).update({
          ...courseSectionData,

          updatedAt: new Date(),
          updatedBy: this.userStore.User,
        }).then(() => {
          this.TempCourseSections[courseIndex]?.elements?.map((item, index) => {
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
      }
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
  async deleteCourseSectionByCourseKey(courseData: any) {
    try {
      const data = pushToArray(await this.afs.collection('sections', ref => ref.where('courseKey', '==', courseData.key)).get().toPromise());

      data.forEach((sectionData) => {
        this.afs.collection(`sections`).doc(sectionData.key).delete();
      });

      this.deleteCourseElementByCourseKey(courseData);

    } catch (error) {
      console.log(error)
    }
  }

  @action
  deleteCourseSectionBySectionKey(sectionData: any) {
    try {
      this.afs.collection(`sections`).doc(sectionData.key).delete();
      this.deleteCourseElementBySectionKey(sectionData);
    } catch (error) {
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
       let isElementDeleted = this.tempDeletedElements.some((item) => elementData.key === item.key);

      if(!isElementDeleted) {
        this.afs.collection('elements').doc(elementData.key).update({
          ...elementData,
          
          updatedAt: new Date(),
          updatedBy: this.userStore.User,
        });
      }
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  getCourseElements(courseKey: string, sectionKey: string) {
    try {
      this.afs.collection('elements', ref => ref.where('courseKey', '==', courseKey).where('sectionKey', '==', sectionKey).orderBy('order', 'asc')).valueChanges().subscribe((data: any) => {
        this.CourseElements = data;
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

  @action 
  async getCourseElements_3(courseKey: string) {
    try {
      const data = pushToArray(await this.afs.collection('elements', ref => ref.where('courseKey', '==', courseKey).orderBy('order', 'asc')).get().toPromise())
      return data;
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

        return item;
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  async deleteCourseElementByCourseKey(course: any) {
    try {
      const data = pushToArray(await this.afs.collection('elements', ref => ref.where('courseKey', '==', course.key)).get().toPromise());

      data.forEach((elementData) => {
        this.deleteCourseElementByElementKey(elementData);
      });
      
    } catch (error) {
      console.log(error)
    }
  }

  @action
  async deleteCourseElementBySectionKey(section: any) {
    try {
      const data = pushToArray(await this.afs.collection('elements', ref => ref.where('sectionKey', '==', section.key)).get().toPromise());

      data.forEach((elementData) => {
        this.deleteCourseElementByElementKey(elementData);
      });

    } catch (error) {
      console.log(error)
    }
  }

  @action
  deleteCourseElementByElementKey(elementData: any) {
    try {
      this.afs.collection(`elements`).doc(elementData.key).delete();
      elementData.files?.forEach((item) => {
        if (item.fileUploadedURL.includes('firebasestorage'))
          this.deleteFileFromFirebase(item.fileUploadedPath);
      });
    } catch (error) {
      console.log(error)
    }
  }
}
