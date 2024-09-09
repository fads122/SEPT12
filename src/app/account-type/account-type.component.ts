import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent {

  constructor(private router: Router) {}

  navigateToSignUp(accountType: string) {
    this.router.navigate(['/sign-up'], { queryParams: { accountType: accountType } });
  }

  navigateToSignIn(accountType: string) {
    this.router.navigate(['/sign-in'], { queryParams: { accountType: accountType } });
  }

  navigateToAdminLogin() {
    this.router.navigate(['/admin/login']);
  }
}
