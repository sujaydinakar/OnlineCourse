import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';

@Component({
  selector: 'app-view-course-element-dialog',
  templateUrl: './view-course-element-dialog.component.html',
  styleUrls: ['./view-course-element-dialog.component.scss']
})
export class ViewCourseElementDialogComponent implements OnInit {

  constructor(
    private embedService: EmbedVideoService,
    public dialogRef: MatDialogRef<ViewCourseElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
  
  ngOnInit(): void {
    // console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkIfItIsVimeoLink(link: string): boolean {
    return link.includes('https://vimeo.com/');
  }

  checkIfAllFilesHasOneVimeoVideo(arrFile: Array<any>): boolean {
    let found = false;

    arrFile.forEach((item) => {
      if(this.checkIfItIsVimeoLink(item.fileUploadedURL))
        found = true;
    });

    return found;
  }

  checkIfThereAttachmentFile(files: Array<any>): boolean {
    let found = false;

    files.forEach((item) => {
      if(!this.checkIfItIsVimeoLink(item.fileUploadedURL))
        found = true;
    });

    return found;
  }

  replaceVimeoURL(oldURL: string) {
    const result = this.embedService.embed(oldURL, {
      attr: { width: "100%", height: "400px" }
    });
    console.log(result)
    return result;
  }
}
