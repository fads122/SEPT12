// In admin-login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service'; // Make sure this is the correct path

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private adminService: AdminService, private router: Router) {} // Use AdminService here

  onSubmit(): void {
    this.adminService.signIn(this.email, this.password).subscribe(
      (success: boolean) => { // Specify the type for success
        if (success) {
          // Navigate to the admin dashboard
          this.router.navigate(['/admin/dashboard']);
          console.log('Login successful. Redirecting to admin dashboard...');
        } else {
          // Handle unsuccessful login
          this.errorMessage = 'Invalid credentials.';
          console.error('Login failed.');
        }
      },
      (error: any) => { // Specify the type for error
        // Handle unexpected errors
        this.errorMessage = 'An unexpected error occurred.';
        console.error('Unexpected login error:', error);
      }
    );
  }
}
