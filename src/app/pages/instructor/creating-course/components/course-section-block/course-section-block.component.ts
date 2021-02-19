import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';

import { map,switchMap } from 'rxjs/operators';
import { UUID } from 'angular2-uuid';

import { UploadingVideoService } from 'src/app/services/uploading_video/uploading-video.service';

import { CourseStore } from 'src/app/stores/course.store';
import { CourseLevelStore } from 'src/app/stores/level.store';
import { CategoryStore } from 'src/app/stores/category.store';
import { CourseLanguageStore } from 'src/app/stores/language.store';
import { SubCategoryStore } from 'src/app/stores/subcategory.store';

import { ViewCourseSectionDialogComponent } from '../view-course-section-dialog/view-course-section-dialog.component';
import { EditCourseSectionDialogComponent } from '../edit-course-section-dialog/edit-course-section-dialog.component';

@Component({
  selector: 'app-course-section-block',
  templateUrl: './course-section-block.component.html',
  styleUrls: ['./course-section-block.component.scss']
})
export class CourseSectionBlockComponent implements OnInit {

  selectedVideo: File;
  selectedFile: File;

  @Input() section_index: string;
  @Input() section_title: string;
  @Input() section_data: any;
  @Input() section_elements: Array<any> = [];

  @Output() deleleSectionEvent:EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteElementEvent:EventEmitter<any> = new EventEmitter<any>();
  @Output() addElementEvent:EventEmitter<any> = new EventEmitter<any>();
  @Output() dragDropElementOrderElement:EventEmitter<any> = new EventEmitter<any>();

  btnDeleteSectionClicked(value: string) {
    this.deleleSectionEvent.emit(value);
  }

  btnDeleteElementClicked(data) {
    this.deleteElementEvent.emit(data);
  }

  lectureTitle = '';
  lectureDescription = '';

  quizTitle = '';
  quizDescription = '';

  exerciseTitle = '';
  exerciseDescription = '';

  assignmentTitle = '';
  assignmentDescription = '';

  finalDataForEmit;

  constructor(
    private dialog: MatDialog,
    private storage: AngularFireStorage,

    public courseStore: CourseStore,
    public levelStore: CourseLevelStore,
    public categoryStore: CategoryStore,
    public languageStore: CourseLanguageStore,
    public subcategoryStore: SubCategoryStore,

    public uploadingVideoService: UploadingVideoService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.uploadingVideoService.vimeoLinkObs.subscribe(
      data => {
        this.vimeo_uploadedVideoUrl = data;
      }, error => {
        throw new Error(error);
      }
    );
  }

  btnAddLectureClicked() {
    if(this.section_index !== undefined) {
      let count = 1;

      if(this.section_elements.length !== 0) {
        this.section_elements.forEach((item) => {
          if(item.type === 'Lecture')
            count++;
        });
      }

      const data = {
        type: 'Lecture',
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.lectureTitle,
        elementDescription: this.lectureDescription,
        section_index: this.section_index,
      };

      if(this.selectedVideo) {
        this.uploadVimeoVideo(this.selectedVideo, data);
      }

      if(this.selectedFile) {
        this.uploadFilesToFirebase(this.selectedFile, 'lecture_attachment_files', data);
      }

      if(!this.selectedVideo && !this.selectedFile) {
        this.finalDataForEmit = { ...data, files: [] };
        this.addElementEvent.emit(this.finalDataForEmit);
      }
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
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.quizTitle,
        elementDescription: this.quizDescription,
        section_index: this.section_index,
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
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.exerciseTitle,
        elementDescription: this.exerciseDescription,
        section_index: this.section_index,
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
        no: count,
        order: this.section_elements.length + 1,
        elementTitle: this.assignmentTitle,
        elementDescription: this.assignmentDescription,
        section_index: this.section_index,
      });

      this.btnCancelAssignmentClicked();
    }
  }

  btnClearInputFromComponent(element_type: string) {
    switch (element_type) {
      case 'Lecture':
        this.btnCancelLectureClicked();
        break;
      case 'Quiz':
        this.btnCancelQuizClicked();
        break;
      case 'Exercise':
        this.btnCancelExerciseClicked();
      case 'Assignment':
        this.btnCancelAssignmentClicked();
        break;
      default:
        break;
    }
  }

  btnCancelLectureClicked() {
    this.lectureTitle = '';
    this.lectureDescription = '';

    this.selectedFile = undefined;
    this.selectedVideo = undefined;
  }

  btnCancelQuizClicked() {
    this.quizTitle = '';
    this.quizDescription = '';
  }

  btnCancelExerciseClicked() {
    this.exerciseTitle = '';
    this.exerciseDescription = '';
  }

  btnCancelAssignmentClicked() {
    this.assignmentTitle = '';
    this.assignmentDescription = '';
  }

  drop(event: CdkDragDrop<string[]>) {
    if(event.previousIndex !== event.currentIndex) {
      moveItemInArray(this.section_elements, event.previousIndex, event.currentIndex);
    
      this.section_elements.map((item, index) => { 
        let count = 0;

        for(let jndex = 0; jndex <= index; jndex++) {
          if(item.type === this.section_elements[jndex].type)
            count++;
        }

        item.order = index + 1
        item.no = count;
      });

      this.dragDropElementOrderElement.emit({
        arrElement: this.section_elements,
        section_index: parseInt(this.section_index) - 1
      })
    };
  }

  generateUUID(){
    return UUID.UUID();
  }

  replaceVimeoURL(oldURL: string) {
    const result = oldURL.replace('https://vimeo.com/', 'https://player.vimeo.com/video/');
    return result;
  }

  formatPercentage(number) {
    return parseFloat(number).toFixed(2);
  }

  // -------------------------------------------------------------------------

  courseVideoChanged(event) {
    if(event.target.files[0]?.type.includes('video')) {
      this.selectedVideo = event.target.files[0];
      this.vimeo_uploadedVideoName = this.selectedVideo.name;
    } else {
      this.selectedVideo = undefined;
    }
  }

  courseFileChanged(event) {
    if(!event.target.files[0].type.includes('video')) {
      this.selectedFile = event.target.files[0];
    } else {

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

        // in here, we have 3 cases of adding element to temporary arrSection
        // 1. first one, if the video is already uploaded, the video will firstly push to file uploaded array and add push elements into arrSection immediately.
        // 2. second one, if there is no selected video, the file will push directly into file uploaded array and and push elements into arrSection immediately.
        // 3. third one, if the video is selected and in process of uploading, the file that finish uploading firstly first will add into uploaded array first and 
        //    and wait until the video finish and add push elements into arrSection immediately.

        if(this.isVideoUploaded) {
          this.finalDataForEmit.files.push({
            key: this.generateUUID(),
            fileUploadedURL,
            fileUploadedPath,
            fileType: item.type,
            fileName: item.name
          });

          this.addElementEvent.emit(this.finalDataForEmit);
        } else if(!this.selectedVideo) {
          this.finalDataForEmit = {
            ...data, 
            files: [
              {
                key: this.generateUUID(),
                fileUploadedURL,
                fileUploadedPath,
                fileType: item.type,
                fileName: item.name
              }
            ]
          };

          this.addElementEvent.emit(this.finalDataForEmit);
        } else {
          this.finalDataForEmit = {
            ...data, 
            files: [
              {
                key: this.generateUUID(),
                fileUploadedURL,
                fileUploadedPath,
                fileType: item.type,
                fileName: item.name
              }
            ]
          };
        }
        
      });
    });
  }

  // -------------------------------------------------------------------------

  private data: any;

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

    this.vimeo_uploadedVideoPct = 0;
    this.vimeo_uploadedVideoStatus = 'Processing ...';

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
          map(data => this.data = data),
          switchMap(
            () => {
              this.uploadingVideoService.updateVimeoLink(this.data.link);
              if (this.data.upload.size === fileForUpload.size) {
                return this.uploadingVideoService.vimeoUpload(this.data.upload.upload_link, fileForUpload);
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
            this.courseStore.TempCourse.promotionVideoUrl = this.vimeo_uploadedVideoUrl;

            this.isVideoUploaded = true;
            this.vimeo_uploadedVideoStatus = 'Uploaded';

            if(this.isFileUploaded) {
              this.finalDataForEmit.files.push({
                key: this.generateUUID(),
                fileUploadedURL: this.vimeo_uploadedVideoUrl,
                fileUploadedPath: this.vimeo_uploadedVideoUrl,
                fileType: fileForUpload.type,
                fileName: fileForUpload.name
              });

              this.addElementEvent.emit(this.finalDataForEmit);
            } else if(this.selectedFile === undefined) {
              this.finalDataForEmit = {
                ...data, 
                files: [
                  {
                    key: this.generateUUID(),
                    fileUploadedURL: this.vimeo_uploadedVideoUrl,
                    fileUploadedPath: this.vimeo_uploadedVideoUrl,
                    fileType: fileForUpload.type,
                    fileName: fileForUpload.name
                  }
                ]
              };

              this.addElementEvent.emit(this.finalDataForEmit);
            } else {
              this.finalDataForEmit = {
                ...data, 
                files: [
                  {
                    key: this.generateUUID(),
                    fileUploadedURL: this.vimeo_uploadedVideoUrl,
                    fileUploadedPath: this.vimeo_uploadedVideoUrl,
                    fileType: fileForUpload.type,
                    fileName: fileForUpload.name
                  }
                ]
              };
            }

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

  btnViewSectionClicked(sectionData, section_index) {
    const dialogRef = this.dialog.open(ViewCourseSectionDialogComponent, {
      width: '90%',
      data: { ...sectionData, index: section_index }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  btnEditSectionClicked(sectionData, section_index) {
    const dialogRef = this.dialog.open(EditCourseSectionDialogComponent, {
      width: '90%',
      data: { ...sectionData, index: section_index }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

}
