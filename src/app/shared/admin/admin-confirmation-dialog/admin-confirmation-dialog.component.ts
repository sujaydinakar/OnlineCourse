import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-confirmation-dialog',
  templateUrl: './admin-confirmation-dialog.component.html',
  styleUrls: ['./admin-confirmation-dialog.component.scss']
})
export class AdminConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AdminConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.data.result = false;
  }

  ngOnInit(): void {
  }

  btnNoClicked() {
    this.data.result = false;
    // this.dialogRef.close();
  }

  btnYesClicked() {
    this.data.result = true;
    // this.dialogRef.close();
  }
}
