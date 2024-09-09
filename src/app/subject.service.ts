// SubjectService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject } from './models/subject.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  private makeRequest<T>(method: string, url: string, body?: any): Observable<T> {
    const token = this.authService.getToken();
    console.log('Auth Token:', token); // Log the token for debugging

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.request<T>(method, url, { body, headers }).pipe(
      catchError(error => {
        console.error(`Error ${method}ing:`, error);
        return throwError(() => error);
      })
    );
  }

  getSubjectsByUserId(userId: number): Observable<Subject[]> {
    if (userId <= 0) {
      console.error('Invalid user ID');
      return throwError(() => new Error('Invalid user ID'));
    }

    return this.makeRequest<Subject[]>(
      'GET',
      `${this.authService.getApiUrl()}/api/subjects/${userId}`
    ).pipe(
      map(response => response || []),
      tap(response => {
        console.log('Raw response from API:', JSON.stringify(response, null, 2));
      }),
      map(response => {
        console.log('Mapped response:', JSON.stringify(response, null, 2));
        return response || [];
      })
    );
  }

  getSubjectsAndExams(userId: number): Observable<any[]> {
    if (userId <= 0) {
      console.error('Invalid user ID');
      return throwError(() => new Error('Invalid user ID'));
    }

    return this.makeRequest<any[]>(
      'GET',
      `${this.authService.getApiUrl()}/api/subjects-with-exams/${userId}`
    ).pipe(
      map(response => response || []),
      tap(response => {
        console.log('Raw response from API:', JSON.stringify(response, null, 2));
      }),
      map(response => {
        console.log('Mapped response:', JSON.stringify(response, null, 2));
        return response || [];
      })
    );
  }

  createSubject(subjectName: string, userId: number): Observable<Subject> {
    if (userId <= 0) {
      console.error('User not authenticated');
      return throwError(() => new Error('User not authenticated'));
    }

    return this.makeRequest<Subject>(
      'POST',
      `${this.authService.getApiUrl()}/api/subjects`,
      { subjectName, userId }
    ).pipe(
      catchError(error => {
        console.error('Error creating subject:', error);
        return throwError(() => error);
      })
    );
  }
}
