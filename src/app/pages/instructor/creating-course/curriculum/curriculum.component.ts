import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { CourseMappingService } from 'src/app/services/mapping/course-mapping.service';
import { UploadingVideoService } from 'src/app/services/uploading_video/uploading-video.service';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  courseKey;
  arrSection: Array<any> = [];
  isShowAddSectionDialog = false;

  sectionTitle = '';
  sectionObjective = '';

  constructor(
    private courseStore: CourseStore,
    public courseMapping: CourseMappingService,
    private activatedRoute: ActivatedRoute,

    private uploadingVideoService: UploadingVideoService,
  ) {
    // this.uploadingVideoService.vimeoDelete(`https://vimeo.com/514839211/4e2eba594c`);
    // this.uploadingVideoService.vimeoDelete(`https://api.vimeo.com/videos/515186354`);
    // this.uploadingVideoService.vimeoDelete('https://api.vimeo.com/videos/514839211');
  }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.courseKey = params.courseId;
      
      this.courseStore.getCourseSections_2(this.courseKey).then((data) => {
        this.arrSection = data;
        
        this.courseStore.getCourseElements_3(this.courseKey).then((data2) => {
          this.arrSection.map((item) => {
            let temp_elements = [];
            // let temp_element;
            item.elements = temp_elements;
            
            data2.forEach((jtem) => {
              if(item.key === jtem.sectionKey) {
                // temp_element = this.courseMapping.mapElement(jtem);
                // temp_elements.push(temp_element);

                temp_elements.push(jtem);
              }
            });
    
            return item;
          });
        });
      });
    });
  }

  set_isShowAddSectionDialog() {
    this.sectionTitle = '';
    this.sectionObjective = '';

    this.isShowAddSectionDialog = !this.isShowAddSectionDialog;
  }

  btnAddSectionClicked() {
    let temp_sectionKey = this.generateUUID();
    let sectionTitle = this.sectionTitle;
    let sectionObjective = this.sectionObjective;

    this.arrSection.push({
      sectionTitle,
      sectionObjective,
      order: this.arrSection.length,
      elements: [],
      temp_sectionKey
    });

    this.sectionTitle = '';
    this.sectionObjective = '';

    this.courseStore.tempInsertedSections.push({
      sectionTitle,
      sectionObjective,
      order: this.arrSection.length,
      elements: [],
      temp_sectionKey
    });

    // this.courseStore.TempCourseSections = this.arrSection;
  }

  btnDeleteSectionClicked(index) {
    if(this.arrSection[index - 1].key !== undefined) {
      this.courseStore.tempDeletedSections.push(this.arrSection[index - 1]);
      let jndex = this.courseStore.tempUpdatedSections.findIndex((item) => item.key === this.arrSection[index - 1].key);
      if(jndex >= 0) this.courseStore.tempUpdatedSections.splice(jndex, 1);
    }

    if (this.arrSection[index - 1].temp_sectionKey !== undefined) {
      let jndex = this.courseStore.tempInsertedSections.findIndex((item) => item.temp_sectionKey === this.arrSection[index - 1].temp_sectionKey);
      if(jndex >= 0) this.courseStore.tempInsertedSections.splice(jndex, 1);
    }

    this.arrSection.splice(index - 1, 1);
    this.recalculateSectionOrder();

    // this.courseStore.TempCourseSections = this.arrSection;
  }

  btnUpdateSectionClicked(sectionData) {
    try {
      delete sectionData.index;

      let index = this.arrSection.findIndex((item) => item.key === sectionData.key);
      this.arrSection[index] = sectionData;

      if (!sectionData.temp_sectionKey) {
        let jndex = this.courseStore.tempUpdatedSections.findIndex((item) => item.key === sectionData.key)
        jndex >= 0 ? this.courseStore.tempUpdatedSections[jndex] = sectionData : this.courseStore.tempUpdatedSections.push(sectionData);
      } else {
        let pos = this.courseStore.tempInsertedSections.findIndex((item) => item.temp_sectionKey === sectionData.temp_sectionKey)
        pos >= 0 ? this.courseStore.tempInsertedSections[pos] = sectionData : '';
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  btnAddElementClicked(data) {
    let key = this.generateUUID();
    let { section_index, type, no, order, elementTitle, elementDescription, files } = data;

    this.arrSection[section_index - 1].elements.push({
      type, 
      no, 
      order,
      elementTitle,
      elementDescription,
      files,
      sectionKey: this.arrSection[section_index - 1]?.key,
      temp_elementKey: key,
      temp_sectionKey: this.arrSection[section_index - 1]?.temp_sectionKey
    });

    this.courseStore.tempInsertedElements.push({
      type, 
      no, 
      order,
      elementTitle,
      elementDescription,
      files,
      sectionKey: this.arrSection[section_index - 1]?.key,
      temp_elementKey: key,
      temp_sectionKey: this.arrSection[section_index - 1]?.temp_sectionKey
    });
    
    // this.courseStore.TempCourseSections = this.arrSection;  
  }

  btnDeleteElementClicked(data) {
    let { section_index, element_index } = data;

    if(this.arrSection[section_index - 1].elements[element_index].key !== undefined) {
      this.courseStore.tempDeletedElements.push(this.arrSection[section_index - 1].elements[element_index]);
      let jndex = this.courseStore.tempUpdatedElements.findIndex((item) => item.key === this.arrSection[section_index - 1].elements[element_index].key);
      if(jndex >= 0) this.courseStore.tempUpdatedElements.splice(jndex, 1);
    }

    if (this.arrSection[section_index - 1].elements[element_index].temp_elementKey !== undefined) {
      let jndex = this.courseStore.tempInsertedElements.findIndex((item) => item.temp_elementKey === this.arrSection[section_index - 1].elements[element_index].temp_elementKey);
      this.courseStore.tempInsertedElements.splice(jndex, 1);
    }

    this.arrSection[section_index - 1].elements.splice(element_index, 1);

    // this.courseStore.TempCourseSections = this.arrSection;
  }

  btnUpdateElementClicked(elementData) {
    try {
      if (!elementData)
        return;
      
      console.log(elementData)
      console.log(this.arrSection)

      let index = elementData.sectionKey !== undefined ?
        this.arrSection.findIndex((item) => item.key === elementData.sectionKey) : this.arrSection.findIndex((item) => item.temp_sectionKey === elementData.temp_sectionKey);
      let jndex = elementData.key !== undefined ?
        this.arrSection[index].elements.findIndex((item) => item.key === elementData.key) : this.arrSection[index].elements.findIndex((item) => item.temp_elementKey === elementData.temp_elementKey);
      
      if(index >= 0 && jndex >= 0) this.arrSection[index].elements[jndex] = elementData;

      if (elementData.temp_elementKey === undefined) {
        let pos = this.courseStore.tempUpdatedElements.findIndex((item) => item.key === elementData.key)
        pos >= 0 ? this.courseStore.tempUpdatedElements[pos] = elementData : this.courseStore.tempUpdatedElements.push(elementData);
      } else {
        console.log(this.courseStore.tempInsertedElements)
        let pos = this.courseStore.tempInsertedElements.findIndex((item) => item.temp_elementKey === elementData.temp_elementKey);
        alert(pos);
        pos >= 0 ? this.courseStore.tempInsertedElements[pos] = elementData : '';
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.arrSection, event.previousIndex, event.currentIndex);
      this.recalculateSectionOrder();

      // this.courseStore.TempCourseSections = this.arrSection;
    }
  }

  recalculateSectionOrder() {
    this.arrSection.map((item, index) => {
      return item.order = index;
    });

    this.arrSection.forEach((item) => {
      if (item.temp_sectionKey === undefined) {
        const indexExistedItemInTempUpdatedSections = this.courseStore.tempUpdatedSections.findIndex((jtem) => jtem.key === item.key);

        if (indexExistedItemInTempUpdatedSections < 0)
          this.courseStore.tempUpdatedSections.push(item)
        else
          this.courseStore.tempUpdatedSections[indexExistedItemInTempUpdatedSections] = item;
        
      } else {
        const indexExistedItemInTempInsertedSections = this.courseStore.tempInsertedSections.findIndex((jtem) => jtem.temp_sectionKey === item.temp_sectionKey);
        this.courseStore.tempInsertedSections[indexExistedItemInTempInsertedSections] = item;
      }
    });
  }

  dragDropElementOrder(data) {
    const { arrElement, section_index } = data;
    this.arrSection[section_index].elements = arrElement;

    this.arrSection[section_index].elements.forEach((item) => {
      if (item.temp_elementKey === undefined) {
        const indexExistedItemInTempUpdatedElements = this.courseStore.tempUpdatedElements.findIndex((jtem) => jtem.key === item.key);

        if (indexExistedItemInTempUpdatedElements < 0)
          this.courseStore.tempUpdatedElements.push(item)
        else
          this.courseStore.tempUpdatedElements[indexExistedItemInTempUpdatedElements] = item;
        
      } else {
        const indexExistedItemInTempInsertedElements = this.courseStore.tempInsertedElements.findIndex((jtem) => jtem.temp_elementKey === item.temp_elementKey);
        this.courseStore.tempInsertedElements[indexExistedItemInTempInsertedElements] = item;
      }
    })
  }

  generateUUID(){
    return UUID.UUID();
  }

}
