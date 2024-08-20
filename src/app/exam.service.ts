import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private apiUrl = 'http://localhost:3000/api'; // Update this if needed

  constructor(private http: HttpClient) { }

  getQuestionsByExamId(examId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/questions/${examId}`);
  }
}
