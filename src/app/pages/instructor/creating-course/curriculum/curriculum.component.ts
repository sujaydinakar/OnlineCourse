import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CourseMappingService } from 'src/app/services/mapping/course-mapping.service';
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
    private courseMapping: CourseMappingService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.courseKey = params.courseId;
      
      this.courseStore.getCourseSections_2(this.courseKey).then((data) => {
        this.arrSection = data;
        
        this.courseStore.getCourseElements_3(this.courseKey).then((data2) => {
          this.arrSection.map((item) => {
            let temp_elements = [];
            let temp_element;
            item.elements = temp_elements;
            
            data2.forEach((jtem) => {
              if(item.key === jtem.sectionKey) {
                temp_element = this.courseMapping.mapElement(jtem);
                temp_elements.push(temp_element);
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
    let sectionTitle = this.sectionTitle;
    let sectionObjective = this.sectionObjective;

    this.arrSection.push({
      sectionTitle,
      sectionObjective,
      order: this.arrSection.length + 1,
      elements: []
    });

    this.courseStore.TempCourseSections = this.arrSection;

    this.sectionTitle = '';
    this.sectionObjective = '';
  }

  btnDeleteSectionClicked(index) {
    this.arrSection.splice(index - 1, 1);
    this.courseStore.TempCourseSections = this.arrSection;
  }

  btnAddElementClicked(data) {
    let { section_index, type, no, order, elementTitle, elementDescription, files } = data;

    this.arrSection[section_index - 1].elements.push({
      type, 
      no, 
      order,
      elementTitle,
      elementDescription,
      files
    });
    
    this.courseStore.TempCourseSections = this.arrSection;  
  }

  btnDeleteElementClicked(data) {
    let { section_index, element_index } = data;
    this.arrSection[section_index - 1].elements.splice(element_index, 1);

    this.courseStore.TempCourseSections = this.arrSection;
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.arrSection, event.previousIndex, event.currentIndex);
    
      this.arrSection.map((item, index) => {
        item.order = index + 1
      });

      this.courseStore.TempCourseSections = this.arrSection;
    }
  }

  dragDropElementOrder(data) {
    const { arrElement, section_index } = data;
    this.arrSection[section_index].elements = arrElement;
    this.courseStore.TempCourseSections = this.arrSection;

    console.log(this.courseStore.TempCourseSections)
  }
}
