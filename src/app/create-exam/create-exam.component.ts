// CreateExamComponent.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Subject as ImportedSubject } from '../models/subject.model';
import { AuthenticationService } from '../authentication.service';
import { SubjectService } from '../subject.service';

interface Answer {
  answerText: string;
  isCorrect: boolean;
}

interface Subject {
  subject_id: number;
  subject_name: string;
}

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  examTitle: string = '';
  selectedSubject: number | undefined;
  subjects: Subject[] = [];
  private apiUrl: string = 'http://localhost:3000/api';
  questions: any[] = [
    {
      questionText: '',
      questionType: 'multiple-choice',
      timeLimit: 5,
      answers: [
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false }
      ]
    }
  ];
  userId: string | undefined;
  userName: string | undefined;
  currentQuestionIndex: number | null = null;
  countdown: number = 5; // Default countdown time
  countdownInterval: any; // Variable to store the countdown interval
  isCountdownActive: boolean = false; // To check if a countdown is active

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private subjectService: SubjectService
  ) {
    console.log('Initial questions:', JSON.stringify(this.questions));
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/sign-in']);
    } else {
      const currentUser = this.authService.getUserInfo();
      console.log('Current User:', currentUser);
      if (currentUser && currentUser.accountType === 'professor') {
        this.userId = currentUser.userID;
        this.userName = currentUser.email;
        this.loadSubjects(); // Load subjects on initialization
      } else {
        this.router.navigate(['/sign-in']);
      }
    }

    console.log('Questions after initialization:', JSON.stringify(this.questions));
  }

  loadSubjects(): void {
    const userIdString = this.authService.getUserId();

    if (userIdString != null) {
      const userIdNumber = parseInt(userIdString.toString(), 10);

      if (!isNaN(userIdNumber)) {
        this.subjectService.getSubjectsAndExams(userIdNumber).subscribe({
          next: (response: any[]) => {
            this.subjects = response;
            console.log('Loaded subjects with exams:', this.subjects);

            // Update the view
            this.updateView();
          },
          error: (error: any) => {
            console.error('Error loading subjects:', error);
            alert('Failed to load subjects. Please refresh the page or contact support.');
          }
        });
      } else {
        console.error('Invalid user ID');
        // Handle invalid user ID (e.g., show an error message)
      }
    } else {
      console.error('No current user found');
      // Redirect to login page or handle appropriately
      this.router.navigate(['/sign-in']);
    }
  }

  updateView() {
    // This method will be called whenever subjects are loaded or changed
    // You can update your view logic here if needed
  }

  addQuestion() {
    this.questions.push({
      questionText: '',
      questionType: 'multiple-choice',
      timeLimit: 5,
      answers: [
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false },
        { answerText: '', isCorrect: false }
      ]
    });
  }

  addAnswer(questionIndex: number) {
    if (this.questions[questionIndex] && this.questions[questionIndex].answers.length < 4) {
      this.questions[questionIndex].answers.push({ answerText: '', isCorrect: false });
    } else {
      alert('You can only add up to 4 choices.');
    }
  }

  createExam() {
    console.log('Creating exam with userId:', this.authService.getUserId());

    if (!this.authService.isLoggedIn()) {
      console.error('User not authenticated');
      return;
    }

    const token = this.authService.getToken();

    if (!token) {
      console.error('No token found, user may not be authenticated');
      this.router.navigate(['/sign-in']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Validate that each question has exactly 4 answers
    for (const question of this.questions) {
      if (question.answers.length !== 4) {
        alert('Each question must have exactly 4 choices.');
        return;
      }
    }

    this.http.post<any>('http://localhost:3000/exams', {
      title: this.examTitle,
      subjectId: this.selectedSubject,
      user_id: this.authService.getUserId(),
      questions: this.questions
    }, { headers }).subscribe({
      next: (response) => {
        console.log('Exam created successfully:', response);
        this.router.navigate(['/teacher-dashboard']);
      },
      error: (error) => {
        console.error('Error creating exam:', error);
      }
    });
  }

  isExamComplete(): boolean {
    if (!this.examTitle || this.selectedSubject === undefined) return false;
    for (const question of this.questions) {
      if (!question.questionText || question.answers.some((answer: Answer) => !answer.answerText)) {
        return false;
      }
    }
    return true;
  }

  getAnswerColor(index: number): string {
    switch (index) {
      case 0: return 'red';
      case 1: return 'blue';
      case 2: return 'yellow';
      case 3: return 'green';
      default: return '';
    }
  }

  setCurrentQuestion(index: number) {
    if (this.isCountdownActive) {
      console.warn('Countdown already active, cannot change question');
      return;
    }

    this.currentQuestionIndex = index;
    this.isCountdownActive = true;

    // Start the countdown before displaying the question
    this.startCountdown(this.countdown, () => {
      // Callback to show the question after the countdown ends
      console.log(`Displaying question: ${this.questions[this.currentQuestionIndex ?? 0].questionText}`);
      this.isCountdownActive = false;
    });
  }

  startCountdown(seconds: number, callback: () => void) {
    this.countdown = seconds;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        callback();
      }
    }, 1000);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    if (this.currentQuestionIndex === event.previousIndex) {
      this.currentQuestionIndex = event.currentIndex;
    }
    console.log('Questions after reorder:', JSON.stringify(this.questions));
    this.setCurrentQuestion(this.currentQuestionIndex ?? 0);
  }
}
