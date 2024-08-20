import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminExamsComponent } from './admin-exams/admin-exams.component';
import { AdminQuestionsComponent } from './admin-questions/admin-questions.component';
import { AdminFlashcardsComponent } from './admin-flashcards/admin-flashcards.component';



@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminUsersComponent,
    AdminExamsComponent,
    AdminQuestionsComponent,
    AdminFlashcardsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
