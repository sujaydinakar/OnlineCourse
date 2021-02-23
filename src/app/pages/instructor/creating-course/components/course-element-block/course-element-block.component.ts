import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseElementDialogComponent } from '../edit-course-element-dialog/edit-course-element-dialog.component';
import { ViewCourseElementDialogComponent } from '../view-course-element-dialog/view-course-element-dialog.component';

@Component({
  selector: 'app-course-element-block',
  templateUrl: './course-element-block.component.html',
  styleUrls: ['./course-element-block.component.scss']
})
export class CourseElementBlockComponent implements OnInit {

  @Input() section_index: string;
  @Input() element_index: string;
  @Input() elementData: any;

  @Output() deleteElementEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateElementEvent:EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  btnViewElementClicked(elementData) {
    this.dialog.open(ViewCourseElementDialogComponent, {
      width: '90%',
      data: { ...elementData }
    });
  }

  btnDeleteElementClicked(section_index, element_index) {
    this.deleteElementEvent.emit({
      section_index,
      element_index
    });
  }

  btnEditElementClicked(elementData) {
    const dialogRef = this.dialog.open(EditCourseElementDialogComponent, {
      width: '90%',
      data: { ...elementData }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.updateElementEvent.emit({
        ...result
      });
    });
  }

}
