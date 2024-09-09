// change-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formData = this.changePasswordForm.value;

      if (formData.newPassword !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      this.userService.changePassword(formData.currentPassword, formData.newPassword).subscribe(
        () => {
          console.log('Password changed successfully');
          this.router.navigate(['/teacher-dashboard']);
        },
        error => {
          console.error('Failed to change password', error);
          // Handle error (e.g., show error message to user)
        }
      );
    }
  }
}
