import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewStudentCourseElementDialogComponent } from '../view-student-course-element-dialog/view-student-course-element-dialog.component';

@Component({
  selector: 'app-student-course-element-block',
  templateUrl: './student-course-element-block.component.html',
  styleUrls: ['./student-course-element-block.component.scss']
})
export class StudentCourseElementBlockComponent implements OnInit {

  @Input() section_index: string;
  @Input() element_index: string;
  @Input() elementData: any;

  @Output() deleteElementEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateElementEvent:EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  btnViewElementClicked(elementData) {
    this.dialog.open(ViewStudentCourseElementDialogComponent, {
      width: '90%',
      data: { ...elementData }
    });
  }

}
