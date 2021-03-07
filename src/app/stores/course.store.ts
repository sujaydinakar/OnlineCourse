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
  @observable public ReversedCourses: Array<ICourse>;
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
        this.ReversedCourses = data;
      });
    } catch(error) {
      console.log(error)
    }
  }

  @action
  async getCourseByKey(courseKey: string) {
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

        if(this.tempInsertedSections !== undefined) {
          this.tempInsertedSections.map((item, index) => {
            const key = this.afs.createId();
            delete item.temp_sectionKey;
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
  async updatedCourse(courseData: ICourse) {
    try {
      this.afs.collection('courses').doc(courseData.key).update({
        ...courseData,
  
        category: this.categoryMapping.mapCategory(courseData.category),
        subcategory: this.categoryMapping.mapCategory(courseData.subcategory),
        level: this.levelMapping.mapLevel(courseData.level),
        language: this.languageMapping.mapLanguage(courseData.language),
        
        updatedAt: new Date(),
        updatedBy: this.userStore.User,
      }).then(async () => {

        this.tempDeletedSections.forEach(async (item) => await this.deleteCourseSectionBySectionKey(item));
        this.tempDeletedElements.forEach(async (item) => await this.deleteCourseElementByElementKey(item));
        
        await Promise.all(
          this.tempInsertedSections.map(async (item, index) => {
            if(item.key === undefined) {
              const key = this.afs.createId();

              await this.addCourseSection(courseData.key, { ...item, key }, index);
              return { ...item, key };
            }
          })
        )

        await Promise.all(
          this.tempUpdatedSections.map(async (item, index) => {
            if(item.key) {
              await this.updatedCourseSection(courseData.key, item, index);
              return { ...item };
            }
          })
        )

        await Promise.all(
          this.tempInsertedElements.map(async (item, index) => {
            if (item.key === undefined && item.sectionKey !== undefined) {
              delete item.temp_sectionKey;

              const key = this.afs.createId();
              const data = { ...item, key };

              await this.addCourseElement(courseData.key, item.sectionKey, data);
              return data;
            }
          })
        )

        await Promise.all(
          this.tempUpdatedElements.map(async (item, index) => {
            if (item.key !== undefined && item.sectionKey !== undefined) {
              delete item.temp_sectionKey;
  
              await this.editCourseElement(item);
              return item;
            }
          })
        )

        this.tempDeletedElements = [];
        this.tempDeletedSections = [];
        this.tempInsertedElements = [];
        this.tempInsertedSections = [];
        this.tempUpdatedElements = [];
        this.tempUpdatedSections = [];

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

      // console.log("---------------- Elements ----------------")
      // console.log(this.tempInsertedElements)
      // console.log(this.tempUpdatedElements)
      // console.log(this.tempDeletedElements)
      // console.log("---------------- Sections ----------------")
      // console.log(this.tempInsertedSections)
      // console.log(this.tempUpdatedSections)
      // console.log(this.tempDeletedSections)

      this.updatedCourse(this.TempCourse);
    }
  }

  @action
  async deleteFileFromFirebase(filePath) {
    try {
      await this.storage.ref(filePath).delete().toPromise();
    } catch(error) {
      console.log(error)
    }
  }

  @action 
  async getCourseSections(courseKey: string) {
    try {
      const data = pushToArray(await this.afs.collection('sections', ref => ref.where('courseKey', '==', courseKey).orderBy('order', 'asc')).get().toPromise());
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
  async addCourseSection(courseKey: string, sectionData: any, courseIndex: any) {
    try {

      const temp_sectionKey = sectionData.temp_sectionKey;
      delete sectionData.temp_sectionKey;

      sectionData = this.courseMapping.mapSection(sectionData);

      const finalSectionData = {
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
      };

      await this.afs.collection('sections').doc(sectionData.key).set(finalSectionData).then(async () => {        
        let sectionIndex = this.TempCourseSections.findIndex((item) => item.temp_sectionKey === temp_sectionKey);
        let elements = this.TempCourseSections[sectionIndex].elements;
        this.TempCourseSections[sectionIndex] = { ...finalSectionData, elements };

        return await Promise.all(
          this.tempInsertedElements.map(async (item, index) => {
            if (item.key === undefined && item.temp_sectionKey === temp_sectionKey) {
              delete item.temp_sectionKey;

              const key = this.afs.createId();
              const data = { ...item, key };

              await this.addCourseElement(courseKey, sectionData.key, data);
              
              return data;
            }
          })
        )
      });

    } catch(error) {
      console.log(error)
    }
  }

  @action
  async updatedCourseSection(courseKey: string, courseSectionData: any, courseIndex: any) {
    try {
      let isSectionDeleted = this.tempDeletedSections.some((item) => courseSectionData.key === item.key);

      if(!isSectionDeleted) {
        courseSectionData = this.courseMapping.mapSection(courseSectionData);

        await this.afs.collection('sections').doc(courseSectionData.key).update({
          ...courseSectionData,

          updatedAt: new Date(),
          updatedBy: this.userStore.User,
        }).then(async () => {

          return await Promise.all(
            this.tempInsertedElements.map(async (item, index) => {
              if (item.key === undefined && item.sectionKey === undefined) {
                delete item.temp_sectionKey;
                const key = this.afs.createId();
                const data = { ...item, key };
                await this.addCourseElement(courseKey, courseSectionData.key, data);
                return data;
              }
            })
          )

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
  async deleteCourseSectionBySectionKey(sectionData: any) {
    try {
      await this.afs.collection(`sections`).doc(sectionData.key).delete();
      await this.deleteCourseElementBySectionKey(sectionData);
    } catch (error) {
      console.log(error)
    }
  }

  @action 
  async addCourseElement(courseKey: string, sectionKey: string, elementData: any) {    
    try {

      const temp_sectionKey = elementData.temp_sectionKey;
      const temp_elementKey = elementData.temp_elementKey;

      delete elementData.temp_sectionKey;
      delete elementData.temp_elementKey;

      const data = {
        ...elementData,

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
      };

      await this.afs.collection('elements').doc(elementData.key).set(data).then(() => {
        let sectionIndex = this.TempCourseSections.findIndex((item) => item.key === sectionKey);
        let elementIndex;

        if (sectionIndex >= 0)
          elementIndex = this.TempCourseSections[sectionIndex].elements.findIndex((item) => item.temp_elementKey === temp_elementKey);
        
        if (elementIndex >= 0)
          this.TempCourseSections[sectionIndex].elements[elementIndex] = data;
      });

    } catch(error) {
      console.log(error)
    }
  }

  @action
  async editCourseElement(elementData: ICourse) {
    try {
       let isElementDeleted = this.tempDeletedElements.some((item) => elementData.key === item.key);

      if(!isElementDeleted) {
        await this.afs.collection('elements').doc(elementData.key).update({
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
        item.elements = temp_elements;
        
        data.forEach((jtem) => {
          if(item.key === jtem.sectionKey) {
            temp_elements.push(jtem);
          }
        });

        return item;
      });

      console.log(this.TempCourseSections)

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

      data.forEach(async (elementData) => {
        let isInDeletedList = this.tempDeletedElements.some((item) => item.key === elementData.key)
        !isInDeletedList ? await this.deleteCourseElementByElementKey(elementData) : '';
      });

    } catch (error) {
      console.log(error)
    }
  }

  @action
  async deleteCourseElementByElementKey(elementData: any) {
    try {
      await this.afs.collection(`elements`).doc(elementData.key).delete();

      elementData.files?.forEach(async (item) => {
        if (item.fileUploadedURL.includes('firebasestorage'))
          await this.deleteFileFromFirebase(item.fileUploadedPath);
      });
    } catch (error) {
      console.log(error)
    }
  }
}
