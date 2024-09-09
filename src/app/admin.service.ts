import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Simulate sign-in (modify as per your authentication implementation)
signIn(email: string, password: string): Observable<boolean> {
  const isValidEmail = email === 'admin';
  const isValidPassword = password === 'admin';

  if (isValidEmail && isValidPassword) {
    return of(true);
  } else {
    return of(false);
  }
}


  getAllRecords(tableName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tables/${tableName}`).pipe(
      catchError(this.handleError)
    );
  }

  getRecordById(tableName: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tables/${tableName}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateRecord(tableName: string, id: number, updates: any): Observable<void> {
    // Check if ID is valid
    if (id === undefined || id === null) {
      console.error('Invalid ID provided for update');
      return throwError(() => new Error('Invalid ID provided for update'));
    }

    return this.http.put<void>(`${this.apiUrl}/tables/${tableName}/${id}`, updates).pipe(
      catchError(this.handleError)
    );
  }


  deleteRecord(tableName: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tables/${tableName}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  fetchTables(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tables`).pipe(
      catchError(this.handleError)
    );
  }
}
