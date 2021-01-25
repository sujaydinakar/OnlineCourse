import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  quizTitle = '';
  quizDescription = '';
  exerciseTitle = '';
  assignmentTitle = '';

  constructor() { }

  ngOnInit(): void { }

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
        order: count,
        elementTitle: this.lectureTitle,
        section_index: this.section_index
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
        order: count,
        elementTitle: this.quizTitle,
        section_index: this.section_index
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
        order: count,
        elementTitle: this.exerciseTitle,
        section_index: this.section_index
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
        order: count,
        elementTitle: this.assignmentTitle,
        section_index: this.section_index
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
}
