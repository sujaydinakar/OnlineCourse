import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-message-dialog',
  templateUrl: './confirm-message-dialog.component.html',
  styleUrls: ['./confirm-message-dialog.component.scss']
})
export class ConfirmMessageDialogComponent implements OnInit {

  dialogTitle;
  dialogContent;

  constructor(
    public dialogRef: MatDialogRef<ConfirmMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const { dialogTitle, dialogContent } = data;
    
    this.dialogTitle = dialogTitle;
    this.dialogContent = dialogContent
  }
  
  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
