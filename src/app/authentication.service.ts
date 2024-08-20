import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token'; // Define the tokenKey property

  constructor(private http: HttpClient, private router: Router) {} // Inject HttpClient and Router

  authenticate(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/signin', { email, password }).pipe(
      map((response: any) => {
        localStorage.setItem('accountType', response.accountType);
        localStorage.setItem(this.tokenKey, response.token); // Use the tokenKey to store the token
        localStorage.setItem('userId', response.userId); // Save userId
        return response;
      }),
      catchError((error: any) => {
        console.error('There was an error!', error);
        return throwError(() => new Error('An error occurred'));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve the token using the tokenKey
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null; // Convert userId to a number
  }

  logout(): void {
    // Remove the token from local storage
    localStorage.removeItem(this.tokenKey); // Remove token using the tokenKey
    localStorage.removeItem('userId'); // Optionally, remove userId from local storage
    localStorage.removeItem('accountType'); // Optionally, remove accountType from local storage

    // Redirect the user to the login page
    this.router.navigate(['/sign-in']); // Navigate to the sign-in page
  }
}
