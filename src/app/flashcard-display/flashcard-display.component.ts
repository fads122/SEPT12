import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-flashcard-display',
  templateUrl: './flashcard-display.component.html',
  styleUrls: ['./flashcard-display.component.css']
})
export class FlashcardDisplayComponent implements OnInit {
  flashcards: any[] = [];

  constructor(
    private flashcardService: FlashcardService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards(): void {
    this.flashcardService.getFlashcards().subscribe({
      next: (response: any[]) => {
        this.flashcards = response;
      },
      error: (err: any) => console.error('Error fetching flashcards', err)
    });
  }
}
