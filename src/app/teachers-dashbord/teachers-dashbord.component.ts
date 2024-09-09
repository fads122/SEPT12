// TeachersDashbordComponent.ts
import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { SubjectService } from '../subject.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from '../models/subject.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teachers-dashbord',
  templateUrl: './teachers-dashbord.component.html',
  styleUrls: ['./teachers-dashbord.component.css']
})
export class TeachersDashbordComponent implements OnInit {
  exams: any[] = [];
  userId: number = 0;
  subjectsWithExams: any[] = [];
  newSubjectName: string = '';

  constructor(
    private examService: ExamService,
    private authService: AuthenticationService,
    private userService: UserService,
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Initial userId:', this.authService.getUserId());

    if (!this.authService.isLoggedIn()) {
      console.error('User not logged in');
      // Redirect to login page or show error
      return;
    }

    this.loadSubjectsAndExams();
  }

  loadSubjectsAndExams(): void {
    const userId = this.authService.getUserId();
    console.log('Loading subjects and exams for userId:', userId);

    if (userId !== null && userId > 0) {
      this.subjectService.getSubjectsAndExams(userId).subscribe(
        (data: any[]) => {
          console.log('API response:', JSON.stringify(data, null, 2));
          this.subjectsWithExams = data;
          console.log('Subjects with exams after assignment:', JSON.stringify(this.subjectsWithExams, null, 2));
          this.displaySubjectsAndExams();
        },
        (error: HttpErrorResponse) => {
          console.error('Error fetching subjects and exams:', error);
          if (error.status === 404) {
            console.error('No subjects found for this user ID');
          } else if (error.status === 500) {
            console.error('Server error occurred while fetching subjects and exams');
          }
          this.subjectsWithExams = []; // Ensure subjectsWithExams is always an array
          this.displaySubjectsAndExams(); // Show empty subjects
        }
      );
    } else {
      console.error('Invalid user ID:', userId);
      alert('Please login and try again.');
    }
  }

  createSubject(): void {
    if (this.newSubjectName.trim()) {
      const userId = this.authService.getUserId();
      if (userId && userId > 0) {
        this.subjectService.createSubject(this.newSubjectName, userId).subscribe(
          (response: Subject) => {
            console.log('Subject created successfully:', response);
            this.subjectsWithExams.push({
              subject_id: response.subject_id,
              subject_name: response.subject_name,
              exams: []
            });
            this.newSubjectName = '';
            this.loadSubjectsAndExams(); // Refresh the subjects list
          },
          (error: any) => {
            console.error('Error creating subject:', error);
            alert('Error creating subject: ' + error.message);
          }
        );
      } else {
        console.error('Invalid user ID when creating subject');
        alert('Please login and try again.');
      }
    }
  }

  displaySubjectsAndExams(): void {
    console.log('Current subjects with exams:', JSON.stringify(this.subjectsWithExams, null, 2));
    if (this.subjectsWithExams.length === 0) {
      console.log('No subjects displayed due to empty array');
    }
  }

  onLogout(): void {
    this.authService.logout();
  }

  isArray(obj: any): boolean {
    return Array.isArray(obj);
  }

  navigateToChangePassword() {
    this.router.navigate(['/change-password']);
  }
}
