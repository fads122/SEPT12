import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

// Define the Flashcard interface
interface Flashcard {
  title: string;
  content: string;
  userID?: string; // Change userId to userID to match the service
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
    private http: HttpClient,
    private userService: UserService,
    private router: Router
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
    const currentUser = this.userService.getCurrentUser();
    if (!currentUser) {
      console.error('User not authenticated.');
      return;
    }

    // Corrected query parameter name to match the server's expectation
    this.http.get<Flashcard[]>(`http://localhost:3000/flashcards?userId=${currentUser.userID}`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.flashcards = response;
        },
        error: (err) => console.error('Error fetching flashcards', err)
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
