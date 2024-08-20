import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

interface Answer {
  answerText: string;
  isCorrect: boolean;
}

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  examTitle: string = '';
  questions: any[] = [{ questionText: '', questionType: 'multiple-choice', timeLimit: 5, answers: [{ answerText: '', isCorrect: false }] }];
  userId: string | undefined;
  userName: string | undefined;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['/sign-in']);
    } else {
      const currentUser = this.userService.getCurrentUser();
      console.log('Current User:', currentUser);  // Log the currentUser to verify the ID
      if (currentUser && currentUser.accountType === 'professor') {
        this.userId = currentUser.userID; // Use currentUser.userID instead of id
        this.userName = currentUser.email;
      } else {
        this.router.navigate(['/sign-in']);
      }
    }
  }

  addQuestion() {
    this.questions.push({ questionText: '', questionType: 'multiple-choice', timeLimit: 5, answers: [{ answerText: '', isCorrect: false }] });
  }

  addAnswer(questionIndex: number) {
    this.questions[questionIndex].answers.push({ answerText: '', isCorrect: false });
  }

  createExam() {
    console.log('Creating exam with userId:', this.userId); // Debugging statement

    if (!this.userId) {
      console.error('User not authenticated');
      return;
    }

    const token = localStorage.getItem('token');  // Get the token from localStorage

    if (!token) {
      console.error('No token found, user may not be authenticated');
      this.router.navigate(['/sign-in']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.post<any>('http://localhost:3000/exams', { title: this.examTitle, userId: this.userId }, { headers }).subscribe(
      (exam: any) => {
        const examId = exam.examId;
        this.questions.forEach(question => {
          this.http.post<any>('http://localhost:3000/questions', {
            examId,
            questionText: question.questionText,
            questionType: question.questionType,
            timeLimit: question.timeLimit
          }, { headers }).subscribe(
            (q: any) => {
              const questionId = q.questionId;
              if (question.questionType === 'multiple-choice') {
                question.answers.forEach((answer: Answer) => {
                  this.http.post<any>('http://localhost:3000/answers', {
                    questionId,
                    answerText: answer.answerText,
                    isCorrect: answer.isCorrect
                  }, { headers }).subscribe(
                    () => {},
                    error => console.error('Error creating answer:', error)
                  );
                });
              }
            },
            error => {
              console.error('Error creating question:', error);
              // Optionally, you might want to handle this error more gracefully
            }
          );
        });
      },
      error => {
        console.error('Error creating exam:', error);
        // Optionally, you might want to handle this error more gracefully
      }
    );
  }
}
