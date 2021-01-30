import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { isNgTemplate } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UUID } from 'angular2-uuid';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-course-section-block',
  templateUrl: './course-section-block.component.html',
  styleUrls: ['./course-section-block.component.scss']
})
export class CourseSectionBlockComponent implements OnInit {

  @Input() section_index: string;
  @Input() section_title: string;
  @Input() section_elements: Array<any> = [];

  @Output() deleleSectionEvent = new EventEmitter<any>();
  @Output() deleteElementEvent = new EventEmitter<any>();
  @Output() addElementEvent = new EventEmitter<any>();

  btnDeleteSectionClicked(value: string) {
    this.deleleSectionEvent.emit(value);
  }

  btnDeleteElementClicked(section_index, element_index) {
    this.deleteElementEvent.emit({
      section_index,
      element_index
    });
  }

  lectureTitle = '';
  lectureDescription = '';

  quizTitle = '';
  quizDescription = '';

  exerciseTitle = '';
  exerciseDescription = '';

  assignmentTitle = '';
  assignmentDescription = '';

  constructor(
    private afs: AngularFirestore,
    private courseStore: CourseStore,
  ) { }

  ngOnInit(): void { 

  }

  btnAddLectureClicked() {
    if(this.section_index !== undefined) {
      let count = 1;

      if(this.section_elements.length !== 0) {
        this.section_elements.forEach((item) => {
          if(item.type === 'Lecture')
            count++;
        });
      }

      this.addElementEvent.emit({
        type: 'Lecture',
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.lectureTitle,
        elementDescription: this.lectureDescription,
        section_index: this.section_index,
      });

      this.btnCancelLectureClicked();
    }
  }

  btnAddQuizClicked() {
    if(this.section_index !== undefined) {
      let count = 1;

      if(this.section_elements.length !== 0) {
        this.section_elements.forEach((item) => {
          if(item.type === 'Quiz')
            count++;
        });
      }

      this.addElementEvent.emit({
        type: 'Quiz',
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.quizTitle,
        elementDescription: this.quizDescription,
        section_index: this.section_index,
      });

      this.btnCancelQuizClicked();
    }
  }

  btnAddExerciseClicked() {
    if(this.section_index !== undefined) {
      let count = 1;

      if(this.section_elements.length !== 0) {
        this.section_elements.forEach((item) => {
          if(item.type === 'Exercise')
            count++;
        });
      }

      this.addElementEvent.emit({
        type: 'Exercise',
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.exerciseTitle,
        elementDescription: this.exerciseDescription,
        section_index: this.section_index,
      });

      this.btnCancelExerciseClicked();
    }
  }

  btnAddAssignmentClicked() {
    if(this.section_index !== undefined) {
      let count = 1;

      if(this.section_elements.length !== 0) {
        this.section_elements.forEach((item) => {
          if(item.type === 'Assignment')
            count++;
        });
      }

      this.addElementEvent.emit({
        type: 'Assignment',
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.assignmentTitle,
        elementDescription: this.assignmentDescription,
        section_index: this.section_index,
      });

      this.btnCancelAssignmentClicked();
    }
  }

  btnCancelLectureClicked() {
    this.lectureTitle = '';
  }

  btnCancelQuizClicked() {
    this.quizTitle = '';
    this.quizDescription = '';
  }

  btnCancelExerciseClicked() {
    this.exerciseTitle = '';
  }

  btnCancelAssignmentClicked() {
    this.assignmentTitle = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.section_elements, event.previousIndex, event.currentIndex);
    
      this.section_elements.map((item, index) => {
        item.order = index + 1
      });

      this.courseStore.TempCourseSections[this.section_index].elements = this.section_elements;
    };
  }

  generateUUID(){
    return UUID.UUID();
  }
}
