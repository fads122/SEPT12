import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service'; // Updated service import
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string = '';
  password: string = '';
  accountType: string = ''; // Ensure this is set correctly

  constructor(
    private userService: UserService, // Updated service injection
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || ''; // Default to an empty string if undefined
    });
  }

  async signUp() {
    if (!this.email || !this.password || !this.accountType) {
      console.error('Please fill in all required fields.');
      return;
    }

    const body = { email: this.email, password: this.password, accountType: this.accountType };

    console.log("Sending signup data:", body);

    try {
      await this.userService.signUp(this.email, this.password, this.accountType).toPromise();
      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }

}
