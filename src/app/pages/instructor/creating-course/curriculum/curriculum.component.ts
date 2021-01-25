import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((params: Params) => {
      this.courseKey = params.courseId;

      this.courseStore.getCourseSections_2(this.courseKey).then((data) => {
        this.arrSection = data;
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
      elements: []
    });

    this.sectionTitle = '';
    this.sectionObjective = '';

    this.courseStore.addCourseSection({
      sectionTitle,
      sectionObjective,
    }, this.courseKey);
  }

  btnDeleteSectionClicked(index) {
    this.arrSection.splice(index - 1, 1);
  }

  btnAddElementClicked(data) {
    let { section_index, type, order, elementTitle } = data;

    this.arrSection[section_index - 1].elements.push({
      type, 
      order, 
      elementTitle
    });
  }

  btnDeleteElementClicked(data) {
    let { section_index, element_index } = data;
    this.arrSection[section_index - 1].elements.splice(element_index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrSection, event.previousIndex, event.currentIndex);
  }

}
