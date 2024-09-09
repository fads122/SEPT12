import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service'; // Ensure this import is present
import { HttpClient } from '@angular/common/http';

// Define the Flashcard interface
interface Flashcard {
  title: string;
  content: string;
  userID?: string; // Optional userID field
}

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  flashcard: Flashcard = { title: '', content: '' };
  flashcards: Flashcard[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient, // This seems unnecessary here unless used elsewhere in the component
    private flashcardService: FlashcardService // Inject FlashcardService here
  ) {}

  ngOnInit(): void {
    this.loadFlashcards();
  }

  onSubmit(): void {
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      console.error('User not authenticated.');
      return;
    }

    const flashcardData = {
      title: this.flashcard.title,
      content: this.flashcard.content,
      userID: currentUser.userID // Include userID
    };

    this.http.post('http://localhost:3000/flashcards', flashcardData, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Flashcard created successfully:', response);
          this.flashcard = { title: '', content: '' }; // Reset form fields
          this.loadFlashcards(); // Reload flashcards after adding new one
          this.redirectUser();
        },
        error: (err) => console.error('Error creating flashcard:', err)
      });
  }

  loadFlashcards(): void {
    this.flashcardService.getFlashcards().subscribe({
      next: (response: any[]) => { // Specify type for response
        this.flashcards = response;
      },
      error: (err: any) => console.error('Error fetching flashcards', err) // Specify type for err
    });
  }

  private redirectUser(): void {
    const currentUser = this.userService.getCurrentUser();
    if (currentUser?.accountType === 'student') {
      this.router.navigate(['/dashboard']);
    } else if (currentUser?.accountType === 'teacher') {
      this.router.navigate(['/teacher-dashboard']);
    }
  }
}
