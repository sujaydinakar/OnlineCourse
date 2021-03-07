import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewStudentCourseSectionDialogComponent } from '../view-student-course-section-dialog/view-student-course-section-dialog.component';

@Component({
  selector: 'app-student-course-section-block',
  templateUrl: './student-course-section-block.component.html',
  styleUrls: ['./student-course-section-block.component.scss']
})
export class StudentCourseSectionBlockComponent implements OnInit {

  @Input() section_index: string;
  @Input() section_title: string;
  @Input() section_data: any;
  @Input() section_elements: Array<any> = [];

  constructor(
    private dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    
  }

  btnViewSectionClicked(sectionData, section_index) {
    const dialogRef = this.dialog.open(ViewStudentCourseSectionDialogComponent, {
      width: '90%',
      data: { ...sectionData, index: section_index }
    });
  }

}