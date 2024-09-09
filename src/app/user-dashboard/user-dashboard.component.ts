import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { MatDialog } from '@angular/material/dialog';
import { FetchFlashcardsDialog } from '../dialogs/fetch-flashcards-dialog/fetch-flashcards-dialog.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  libraries = [
    { value: 'library1', viewValue: 'Library 1' },
    { value: 'library2', viewValue: 'Library 2' },
    // Add more libraries as needed
  ];

  studyTools = [
    { value: 'material', viewValue: 'Material' },
    { value: 'tool2', viewValue: 'Tool 2' },
    // Add more tools as needed
  ];

  flashcards: any[] = [];
  userId: number | null = null;

  constructor(
    private router: Router,
    private flashcardService: FlashcardService,
    private authService: AuthenticationService,
    private userService: UserService,
    private http: HttpClient, // Inject HttpClient here
    private dialog: MatDialog // Inject MatDialog here

  ) {}

ngOnInit(): void {
  const currentUser = this.userService.getCurrentUser();
  if (!currentUser) {
    console.error('No user found in the dashboard');
    return;
  }

  console.log('Fetching flashcards for user:', currentUser.userID); // Assuming the property is 'id'
  this.http.get(`http://localhost:3000/flashcards?userId=${currentUser.userID}`, { withCredentials: true })
  .subscribe({
    next: (flashcards: any) => {
      console.log('Flashcards retrieved:', flashcards);
      this.flashcards = flashcards;
    },
    error: (err: any) => console.error('Error retrieving flashcards:', err)
  });
}

  navigateToTool(tool?: any) {
    if (!tool || !tool.viewValue) return;

    if (tool.viewValue === 'Material') {
      this.router.navigate(['/material']);
    }
  }

  loadFlashcards() {
    if (this.userId !== null) {
      this.flashcardService.getFlashcardsByUserId(this.userId).subscribe(data => {
        this.flashcards = data;
      });
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  async openFlashcardModal(flashcard: any): Promise<void> {
    const dialogRef = this.dialog.open(FetchFlashcardsDialog, {
      width: '250px',
      data: { flashcard: flashcard }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Perform any action after closing the dialog
    });
  }
}
