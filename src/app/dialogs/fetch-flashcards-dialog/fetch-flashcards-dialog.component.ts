import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-fetch-flashcards-dialog',
  templateUrl: './fetch-flashcards-dialog.component.html', // Ensure this matches your template file location
  styleUrls: ['./fetch-flashcards-dialog.component.css'] // Optional: Adjust if you have custom styles
})
export class FetchFlashcardsDialog {
  isFlipped = false;

  constructor(
    public dialogRef: MatDialogRef<FetchFlashcardsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
