import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private baseUrl = 'http://localhost:3000'; // Adjust to your API base URL

  constructor(private http: HttpClient) {}

  // Save results to the backend
  saveExamResults(examId: number, studentId: number, score: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/save-results`, { examId, studentId, score });
  }

  // Fetch results for a specific exam
  getExamResults(examId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/exam-results/${examId}`);
  }
}
