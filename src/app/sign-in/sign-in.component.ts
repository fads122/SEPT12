import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  accountType: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Retrieve the account type from the query params
    this.route.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
    });
  }

  signIn() {
    this.userService.authenticate(this.email, this.password).subscribe(
      response => {
        console.log('Login successful:', response);

        // Redirect based on account type
        if (response.user.accountType === 'student') {
          this.router.navigate(['/dashboard']); // Redirect to Student Dashboard
        } else if (response.user.accountType === 'professor') {
          this.router.navigate(['/teacher-dashboard']); // Redirect to Teacher Dashboard
        }
      },
      error => {
        console.error('Login failed:', error);
        if (error.message === 'An error occurred during authentication.') {
          alert('An error occurred on the server. Please try again later.');
        } else if (error.message === 'Invalid credentials') {
          alert('Invalid credentials. Please check your email and password.');
        } else {
          alert('Login failed: ' + (error.message || 'Unknown error.'));
        }
      }
    );
  }
}
