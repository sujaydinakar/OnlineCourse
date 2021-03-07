import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-student-course-section-dialog',
  templateUrl: './view-student-course-section-dialog.component.html',
  styleUrls: ['./view-student-course-section-dialog.component.scss']
})
export class ViewStudentCourseSectionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewStudentCourseSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }
  
  ngOnInit(): void {
    console.log(this.data)
  }

  getVimeoVideoLink(arrFiles: Array<any>) {
    let index = arrFiles.findIndex((item) => item.includes('https://vimeo.com/'));
    return index === -1 ? undefined : arrFiles[index].fileUploadedURL;
  }

}
