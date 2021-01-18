import { Component, OnInit } from '@angular/core';
import { CourseStore } from 'src/app/stores/course.store';

@Component({
  selector: 'app-target-your-students',
  templateUrl: './target-your-students.component.html',
  styleUrls: ['./target-your-students.component.scss']
})
export class TargetYourStudentsComponent implements OnInit {

  answerOfObjective = '';
  answerOfCourseRequirements = '';
  answerOfTargetStudent = '';

  // arrObjective: Array<any> = [];
  // arrCourseRequirements: Array<any> = [];
  // arrTargetStudent: Array<any> = [];

  constructor(
    public courseStore: CourseStore
  ) { }

  ngOnInit(): void {

  }

  textExistedInArrObjective(event, index) {
    // this.arrObjective[index] = event.target.value;
    this.courseStore.TempCourse.arrStudentObjective[index] = event.target.value;
  }

  deleteTextExistedInArrObjective(index) {
    // this.arrObjective.splice(index, 1);
    this.courseStore.TempCourse.arrStudentObjective.splice(index, 1);
  }

  btnAddAnswerToArrObjectiveClicked() {
    // this.arrObjective.push(this.answerOfObjective);
    this.courseStore.TempCourse.arrStudentObjective.push(this.answerOfObjective);
    this.answerOfObjective = '';
  }

  textExistedInArrCourseRequirements(event, index) {
    this.courseStore.TempCourse.arrStudentRequirement[index] = event.target.value;
  }

  deleteTextExistedInArrCourseRequirements(index) {
    this.courseStore.TempCourse.arrStudentRequirement.splice(index, 1);
  }

  btnAddAnswerToArrCourseRequirementsClicked() {
    this.courseStore.TempCourse.arrStudentRequirement.push(this.answerOfCourseRequirements);
    this.answerOfCourseRequirements = '';
  }

  textExistedInArrTargetStudent(event, index) {
    this.courseStore.TempCourse.arrTargetStudent[index] = event.target.value;
  }

  deleteTextExistedInArrTargetStudent(index) {
    this.courseStore.TempCourse.arrTargetStudent.splice(index, 1);
  }

  btnAddAnswerToArrTargetStudentClicked() {
    this.courseStore.TempCourse.arrTargetStudent.push(this.answerOfTargetStudent);
    this.answerOfTargetStudent = '';
  }

  // changeStateInCourseStore() {
  //   this.courseStore.TempCourse.arrStudentObjective = this.arrObjective;
  //   this.courseStore.TempCourse.arrStudentRequirement = this.arrCourseRequirements;
  //   this.courseStore.TempCourse.arrTargetStudent = this.arrTargetStudent;
  // }

}