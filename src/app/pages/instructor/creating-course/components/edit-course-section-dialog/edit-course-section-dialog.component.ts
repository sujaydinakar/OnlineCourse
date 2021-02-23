import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewCourseSectionDialogComponent } from '../view-course-section-dialog/view-course-section-dialog.component';

@Component({
  selector: 'app-edit-course-section-dialog',
  templateUrl: './edit-course-section-dialog.component.html',
  styleUrls: ['./edit-course-section-dialog.component.scss']
})
export class EditCourseSectionDialogComponent implements OnInit {

  sectionTitle;
  sectionObjective;

  editSectionForm;

  constructor(
    private formBuilder: FormBuilder,

    public dialogRef: MatDialogRef<ViewCourseSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.editSectionForm = this.formBuilder.group({
      sectionTitle: this.data.sectionTitle,
      sectionObjective: this.data.sectionObjective
    });
  }
  
  ngOnInit(): void {

  }
  
  btnCloseClicked() {
    this.dialogRef.close(undefined);
  }

  btnCancelClicked() {
    this.editSectionForm = this.formBuilder.group({
      sectionTitle: this.data.sectionTitle,
      sectionObjective: this.data.sectionObjective
    });
  }

  onSubmit(sectionData) {
    this.dialogRef.close({ ...this.data, ...sectionData });
  }

}