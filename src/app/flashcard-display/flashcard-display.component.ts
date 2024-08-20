import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-flashcard-display',
  templateUrl: './flashcard-display.component.html',
  styleUrls: ['./flashcard-display.component.css']
})
export class FlashcardDisplayComponent implements OnInit {
  flashcards: any[] = [];
  userId!: number; // Keep userId as a number

  constructor(
    private flashcardService: FlashcardService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.userId = parseInt(currentUser.userID, 10); // Convert userID to a number
      this.flashcardService.getFlashcardsByUserId(this.userId).subscribe({
        next: (response: any[]) => {
          this.flashcards = response;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching flashcards', err);
        }
      });
    } else {
      console.error('User ID is not available.');
    }
  }
}
