import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-exam',
  templateUrl: './join-exam.component.html',
  styleUrls: ['./join-exam.component.css']
})
export class JoinExamComponent {
  examCode: string = '';
  userId: string = ''; // Ensure this is set correctly

  constructor(private http: HttpClient, private router: Router) {
    // Initialize userId from session or authentication (example only)
    this.userId = this.getUserIdFromSession();
  }

  joinExam() {
    const examDetails = {
      examCode: this.examCode.trim(), // Ensure there are no leading/trailing spaces
      userId: this.userId
    };

    this.http.post('http://localhost:3000/api/join-exam', examDetails)
      .subscribe(
        (response: any) => {
          console.log('Exam joined successfully:', response);
          this.router.navigate([`/exam/${response.examDetails.exam.exam_id}`], { state: { examDetails } });
        },
        (error) => {
          console.error('Invalid Exam Code', error);
          alert(`Error: ${error.error.message}`); // Display the error message
        }
      );
  }

  private getUserIdFromSession(): string {
    // Implement your logic to get the userId from the session or authentication
    // This is just an example
    return 'some-user-id';
  }
}
