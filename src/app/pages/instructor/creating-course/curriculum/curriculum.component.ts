import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

  arrSection: Array<any> = [];
  isShowAddSectionDialog = false;

  sectionTitle: '';
  sectionObjective: '';

  lectureTitle: '';
  lectureSection: '';
  quizTitle: '';
  quizSection: '';
  exerciseTitle: '';
  exerciseSection: '';
  assignmentTitle: '';
  assignmentSection: '';

  constructor() { }

  ngOnInit(): void {
  }

  set_isShowAddSectionDialog() {
    this.isShowAddSectionDialog = !this.isShowAddSectionDialog;
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  btnAddSectionClicked() {
    let sectionTitle = this.sectionTitle;
    let sectionObjective = this.sectionObjective;

    this.arrSection.push({
      sectionTitle,
      sectionObjective,
      elements: []
    })
  }

  btnAddLectureClicked() {
    let sectionIndex;
    let section;

    let elementTitle = this.lectureTitle;
    let elementSection = this.lectureSection;

    this.arrSection.forEach((item, index) => {
      if(item.sectionTitle === elementSection) {
        sectionIndex = index;
        section = item;
      }
    });

    if(sectionIndex !== undefined) {
      let count = 1;

      this.arrSection[sectionIndex].elements.forEach((item) => {
        if(item.type === 'Lecture')
          count++;
      });

      this.arrSection[sectionIndex].elements.push({
        type: 'Lecture',
        order: count,
        elementTitle
      });
    }
  }

  btnAddQuizClicked() {
    let sectionIndex;
    let section;

    let elementTitle = this.quizTitle;
    let elementSection = this.quizSection;

    this.arrSection.forEach((item, index) => {
      if(item.sectionTitle === elementSection) {
        sectionIndex = index;
        section = item;
      }
    });

    if(sectionIndex !== undefined) {
      let count = 1;

      this.arrSection[sectionIndex].elements.forEach((item) => {
        if(item.type === 'Quiz')
          count++;
      });

      this.arrSection[sectionIndex].elements.push({
        type: 'Quiz',
        order: count,
        elementTitle
      });
    }
  }

  btnAddExerciseClicked() {
    let sectionIndex;
    let section;

    let elementTitle = this.exerciseTitle;
    let elementSection = this.exerciseSection;

    this.arrSection.forEach((item, index) => {
      if(item.sectionTitle === elementSection) {
        sectionIndex = index;
        section = item;
      }
    });

    if(sectionIndex !== undefined) {
      let count = 1;

      this.arrSection[sectionIndex].elements.forEach((item) => {
        if(item.type === 'Exercise')
          count++;
      });

      this.arrSection[sectionIndex].elements.push({
        type: 'Exercise',
        order: count,
        elementTitle
      });
    }
  }

  btnAddAssignmentClicked() {
    let sectionIndex;
    let section;

    let elementTitle = this.assignmentTitle;
    let elementSection = this.assignmentSection;

    this.arrSection.forEach((item, index) => {
      if(item.sectionTitle === elementSection) {
        sectionIndex = index;
        section = item;
      }
    });

    if(sectionIndex !== undefined) {
      let count = 1;

      this.arrSection[sectionIndex].elements.forEach((item) => {
        if(item.type === 'Assignment')
          count++;
      });

      this.arrSection[sectionIndex].elements.push({
        type: 'Assignment',
        order: count,
        elementTitle
      });
    }
  }

  btnDeleteSectionClicked(index) {
    this.arrSection.splice(index, 1);
  }

  btnDeleteElementClicked(index, jndex) {
    this.arrSection[index].elements.splice(jndex, 1);
  }
}
