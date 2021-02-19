import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-course-section-dialog',
  templateUrl: './view-course-section-dialog.component.html',
  styleUrls: ['./view-course-section-dialog.component.scss']
})
export class ViewCourseSectionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewCourseSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }
  
  ngOnInit(): void {

  }

  getVimeoVideoLink(arrFiles: Array<any>) {
    let index = arrFiles.findIndex((item) => item.includes('https://vimeo.com/'));
    return index === -1 ? undefined : arrFiles[index].fileUploadedURL;
  }
}
