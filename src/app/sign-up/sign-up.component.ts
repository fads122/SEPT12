import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  email: string = '';
  password: string = '';
  accountType: string = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.accountType = params['accountType'] || '';
    });
  }

  async signUp() {
    if (!this.validateEmail()) {
      alert('The email is not valid. It must end with @gmail.com.');
      return;
    }

    if (!this.validatePassword()) {
      alert('The password must contain at least one number and be at least 8 characters long.');
      return;
    }

    if (!this.accountType) {
      alert('Account type is required.');
      return;
    }

    const body = { email: this.email, password: this.password, accountType: this.accountType };

    console.log("Sending signup data:", body);

    try {
      await this.userService.signUp(this.email, this.password, this.accountType).toPromise();
      this.router.navigate(['/sign-in']);
    } catch (error) {
      console.error('Error signing up:', error);
      alert('This email is already used.');
    }
  }

  validateEmail(): boolean {
    const emailRegex = /@gmail\.com$/;
    return emailRegex.test(this.email);
  }

  validatePassword(): boolean {
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(this.password);
  }
}
