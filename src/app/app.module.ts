import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { AccountTypeComponent } from './account-type/account-type.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TeachersDashbordComponent } from './teachers-dashbord/teachers-dashbord.component';
import { QuizComponent } from './quiz/quiz.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { StudentMaterialComponent } from './student-material/student-material.component';
import { ReportsComponent } from './reports/reports.component';
import { CreateExamComponent } from './create-exam/create-exam.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { AuthInterceptor } from './auth.interceptor'; // Import your AuthInterceptor
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { GamifiedExamComponent } from './gamified-exam/gamified-exam.component';
import { JoinExamComponent } from './join-exam/join-exam.component';
import { WaitingRoomComponent } from './waiting-room/waiting-room.component'; // Import WaitingRoomComponent
import { WebSocketService } from './web-socket.service';
import { FlashcardDisplayComponent } from './flashcard-display/flashcard-display.component'; // Import WebSocketService

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountTypeComponent,
    UserDashboardComponent,
    TeachersDashbordComponent,
    QuizComponent,
    FlashcardComponent,
    StudentMaterialComponent,
    ReportsComponent,
    CreateExamComponent,
    SignInComponent,
    SignUpComponent,
    GamifiedExamComponent,
    JoinExamComponent,
    WaitingRoomComponent,
    FlashcardDisplayComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Use your AuthInterceptor
      multi: true,
    },
    AuthenticationService, // Correctly placed inside the providers array
    JwtHelperService, // Add JwtHelperService here
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, // Configure JWT_OPTIONS
    WebSocketService, // Add WebSocketService to providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
