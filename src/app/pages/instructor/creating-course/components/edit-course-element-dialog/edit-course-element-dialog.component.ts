import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadingVideoService } from 'src/app/services/uploading_video/uploading-video.service';
import { ViewCourseElementDialogComponent } from '../view-course-element-dialog/view-course-element-dialog.component';
import { map,switchMap } from 'rxjs/operators';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-course-element-dialog',
  templateUrl: './edit-course-element-dialog.component.html',
  styleUrls: ['./edit-course-element-dialog.component.scss']
})
export class EditCourseElementDialogComponent implements OnInit {

  editElementForm;

  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,

    private uploadingVideoService: UploadingVideoService,
    public dialogRef: MatDialogRef<ViewCourseElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }
  
  ngOnInit(): void {
    this.editElementForm = this.formBuilder.group({
      elementTitle: this.data.elementTitle,
      elementDescription: this.data.elementDescription
    })
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
    const result = oldURL.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
    return result;
  }

  onSubmit(elementData) {

  }

  // -------------------------------------------------------------------------

  selectedVideo;
  selectedFile;

  courseVideoChanged(event) {
    if(event.target.files[0].type.includes('video')) {
      this.selectedVideo = event.target.files[0];
      this.vimeo_uploadedVideoName = this.selectedVideo.name;
    }
  }

  courseFileChanged(event) {
    if(!event.target.files[0].type.includes('video')) {
      this.selectedFile = event.target.files[0];
    }
  }

  // -------------------------------------------------------------------------

  firebase_downloadURL: string;
  firebase_task: AngularFireUploadTask;
  firebase_IsUploaded: string;
  firebase_UploadingPercentage;
  firebase_UploadedStatus: string;
  isFileUploaded: boolean = false;

  uploadFilesToFirebase(item: File, basePath: string, data) {
    const filePath = `${basePath}/${Date.now()}_${item.name}`;
    const storageRef = this.storage.ref(filePath);

    this.firebase_UploadedStatus = "Uploading ..."
    this.firebase_task = this.storage.upload(filePath, item);
    this.firebase_task.percentageChanges().subscribe((data) => {
      this.firebase_UploadingPercentage = data;
    });

    this.firebase_task.then((f) => {
      f.ref.getDownloadURL().then((downloadURL) => {
        let fileUploadedURL = downloadURL;
        let fileUploadedPath = filePath;

        this.isFileUploaded = true;
        this.firebase_UploadedStatus = "Uploaded";
      })
    })
  }

  // -------------------------------------------------------------------------

  private uploadData: any;

  vimeo_uploadedVideoUrl;
  vimeo_uploadedVideoPct;
  vimeo_uploadedVideoName;
  vimeo_uploadedVideoStatus;
  isVideoUploaded: boolean = false;

  // Track upload status by tracking code
  // 0 - Not started
  // 1 - File chosen
  // 2 - Wrong file type
  // 3 - Uploading
  // 4 - Upload error
  // 5 - Upload complete
  
  public uploadStatus: Number = 0;

  uploadVimeoVideo(fileForUpload: File, data: any): void {
    this.uploadStatus = 1;

    if (fileForUpload === undefined) {
      console.log('No file selected!');
      return;
    }

    const isAccepted = this.checkAllowedType(fileForUpload.type);

    if (isAccepted) {
      this.uploadStatus = 1;

      const options = {
        // token: '2f72e3f8d1269d8f11c1387e272ef3d5',
        token: 'f94e5f0392297d6bb9ffcb297874583f',
        url: 'https://api.vimeo.com/me/videos',
        videoName: this.vimeo_uploadedVideoName,
        videoDescription: this.vimeo_uploadedVideoName + '\'s description'
      };

      this.vimeo_uploadedVideoStatus = "Uploading ...";

      this.uploadingVideoService.createVimeo(options, fileForUpload.size)
        .pipe(
          map(data => this.uploadData = data),
          switchMap(
            () => {
              this.uploadingVideoService.updateVimeoLink(this.uploadData.link);
              if (this.uploadData.upload.size === fileForUpload.size) {
                return this.uploadingVideoService.vimeoUpload(this.uploadData.upload.upload_link, fileForUpload);
              } else {
                this.uploadStatus = 4;
              }
            }
          )
        ).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.vimeo_uploadedVideoPct = Math.round(100 * event.loaded / event.total);
              this.uploadStatus = 3;
            } else if (event instanceof HttpResponse) {
              this.uploadStatus = 5;
              setTimeout(() => {
                this.uploadStatus = 0;
              }, 5000);
            }
          },
          (error) => {
            console.log('Upload Error:', error);
            this.uploadStatus = 4;
          }, () => {
            alert(this.vimeo_uploadedVideoUrl)
          }
        );
    } else {
      this.uploadStatus = 2;
    }
  }

  allowUpload(): void {
    this.uploadStatus = 0;
  }

  checkAllowedType(filetype: string): boolean {
    const allowed = ['mov', 'wmv', 'avi', 'flv', 'mp4'];
    const videoType = filetype.split('/').pop();
    return allowed.includes(videoType);
  }

}
