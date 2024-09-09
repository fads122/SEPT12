// ExamService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getQuestionsByExamId(examId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/questions/${examId}`);
  }

  getExamsCreatedBy(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/exams/created-by/${userId}`);
  }

  getSubjects(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/subjects/${userId}`);
  }
}
