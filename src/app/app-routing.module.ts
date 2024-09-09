// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTypeComponent } from './account-type/account-type.component';
import { QuizComponent } from './quiz/quiz.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { StudentMaterialComponent } from './student-material/student-material.component';
import { TeachersDashbordComponent } from './teachers-dashbord/teachers-dashbord.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuard } from './auth.guard';
import { JoinExamComponent } from './join-exam/join-exam.component';
import { GamifiedExamComponent } from './gamified-exam/gamified-exam.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: '', component: AccountTypeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'account-type', component: AccountTypeComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] }, // Student Dashboard
  { path: 'material', component: StudentMaterialComponent, canActivate: [AuthGuard] },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'flashcard', component: FlashcardComponent, canActivate: [AuthGuard] },
  { path: 'teacher-dashboard', component: TeachersDashbordComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'create-exam', component: CreateExamComponent, canActivate: [AuthGuard] },
  { path: 'join-exam', component: JoinExamComponent, canActivate: [AuthGuard] },
  { path: 'exam/:examId', component: GamifiedExamComponent, canActivate: [AuthGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent},
  { path: 'change-password', component: ChangePasswordComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
