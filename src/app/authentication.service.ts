// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';

interface User {
  userID: string;
  email: string;
  accountType: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private userIdKey = 'userId';
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}

  authenticate(email: string, password: string): Observable<any> {
    return this.http.post('http://localhost:3000/signin', { email, password }).pipe(
      map((response: any) => {
        console.log('Authentication response:', JSON.stringify(response, null, 2));

        if (!response || !response.token || !response.user || !response.user.userID) {
          throw new Error('Invalid authentication response');
        }

        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userIdKey, response.user.userID.toString());
        localStorage.setItem('accountType', response.user.accountType);
        this.userService.updateCurrentUser(response.user); // Use the public method

        return response;
      }),
      catchError((error: any) => {
        console.error('Authentication error:', error);
        return throwError(() => new Error('Authentication failed'));
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | null {
    const userId = localStorage.getItem(this.userIdKey);
    return userId ? parseInt(userId, 10) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUserId();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem('accountType');
    this.userService.logout();
    this.router.navigate(['/sign-in']);
  }

  getUserInfo(): User | null {
    return this.userService.getCurrentUser();
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}
