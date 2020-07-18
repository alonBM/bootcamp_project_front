import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserListComponent } from '../user-list/user-list.component'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; body: string }
  ) { }

  /**
   * Closes the mat-dialog.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
