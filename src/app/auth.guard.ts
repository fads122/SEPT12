import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  // The canActivate method is called when the user tries to navigate to a protected route.
  canActivate(): Observable<boolean> {
    return this.userService.checkSession().pipe(
      map(user => {
        // If the session is valid, the user is allowed to access the route.
        if (user) {
          return true;
        } else {
          // If the session is invalid, redirect the user to the sign-in page.
          this.router.navigate(['/sign-in']);
          return false;
        }
      }),
      catchError(() => {
        // If there's an error (e.g., network issue), redirect to the sign-in page.
        this.router.navigate(['/sign-in']);
        return of(false);
      })
    );
  }
}
