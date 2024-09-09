import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  accountType: string = '';
  tokenKey = 'token';
  userIdKey = 'userId';

  constructor(
    private authService: AuthenticationService,
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
    this.authService.authenticate(this.email, this.password).subscribe(
      response => {
        console.log('Login successful:', response);

        // Navigate to dashboard with user ID
        const userId = response.user.id;
        this.router.navigate(['/teacher-dashboard'], { queryParams: { userId } });
      },
      error => {
        console.error('Login failed:', error);
        alert('Login failed: ' + (error.message || 'Unknown error.'));
      }
    );
  }
}
