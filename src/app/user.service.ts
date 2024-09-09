// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

interface User {
  userID: string;
  email: string;
  accountType: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser ? JSON.parse(savedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  authenticate(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('http://localhost:3000/signin', { email, password }).pipe(
      map((response: SignInResponse) => {
        console.log('User ID stored:', response.user.userID);
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        return response;
      }),
      catchError((error: any) => {
        console.error('Error during authentication:', error.message);
        return throwError(() => new Error('An error occurred during authentication.'));
      }
    ));
  }

  signUp(email: string, password: string, accountType: string): Observable<User> {
    return this.http.post<User>('http://localhost:3000/signup', { email, password, accountType })
      .pipe(
        tap(user => this.currentUserSubject.next(user)),
        catchError(this.handleError)
      );
  }

  checkSession(): Observable<User> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token in checkSession');
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ user: User }>('http://localhost:3000/protected', { headers })
      .pipe(
        map(response => response.user),
        tap(user => this.currentUserSubject.next(user)),
        catchError(error => {
          console.error('Check session error:', error.message);
          return throwError(() => new Error('Error checking session. Please log in again.'));
        })
      );
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  }

  getUserID(): number | null {
    const currentUser = this.getCurrentUser();
    return currentUser ? parseInt(currentUser.userID, 10) : null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const userId = this.getUserID();
    if (!userId) {
      console.error('User ID not found');
      return throwError(() => new Error('User ID not found'));
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    const body = {
      currentPassword,
      newPassword,
      userId // Add this line
    };

    return this.http.put(`http://localhost:3000/api/users/changepassword/${userId}`, body, { headers })
      .pipe(
        tap(() => {
          console.log('Password changed successfully');
        }),
        catchError(this.handleError)
      );
  }
}
