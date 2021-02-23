import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-message-dialog',
  templateUrl: './alert-message-dialog.component.html',
  styleUrls: ['./alert-message-dialog.component.scss']
})
export class AlertMessageDialogComponent implements OnInit {

  dialogTitle;
  dialogContent;

  constructor(
    public dialogRef: MatDialogRef<AlertMessageDialogComponent>,
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
