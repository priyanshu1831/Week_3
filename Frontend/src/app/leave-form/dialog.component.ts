import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  template: `
    <h2 mat-dialog-title>Submission Status</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
}
