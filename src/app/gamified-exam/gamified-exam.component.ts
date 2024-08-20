import { Component, OnInit, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../exam.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-gamified-exam',
  templateUrl: './gamified-exam.component.html',
  styleUrls: ['./gamified-exam.component.css']
})
export class GamifiedExamComponent implements OnInit, AfterViewInit {
  examId: string | null = null;
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  shuffledAnswers: Answer[] = [];
  correctAnswer: Answer | null = null;
  selectedAnswer: Answer | null = null;

  countdown: number = 5;
  questionTimer: number = 0;  // Default value
  showCountdown: boolean = true;
  showQuestion: boolean = false;
  showChoices: boolean = false;

  @ViewChildren('choiceElement') choiceElements!: QueryList<ElementRef>;

  countdownInterval: any;
  questionInterval: any;

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.examId = params.get('examId');
      console.log('Exam ID:', this.examId);
      this.loadQuestions();
    });
  }

  ngAfterViewInit(): void {
    // This ensures the view is fully initialized before manipulating the DOM
  }

  loadQuestions(): void {
    if (this.examId) {
      this.examService.getQuestionsByExamId(this.examId).subscribe(
        (response: any) => {
          this.questions = response.questions;
          console.log('Questions:', this.questions);
          this.startCountdown();
        },
        error => {
          console.error('Error loading questions:', error);
        }
      );
    } else {
      console.error('No exam ID found in the route parameters.');
    }
  }

  startCountdown(): void {
    this.showCountdown = true;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        this.displayQuestion();
      }
    }, 1000);
  }

  displayQuestion(): void {
    console.log('Current Question Index:', this.currentQuestionIndex);
    console.log('Questions Length:', this.questions.length);
    console.log('Current Question:', this.questions[this.currentQuestionIndex]);

    this.showCountdown = false;
    this.showQuestion = true;
    const question = this.questions[this.currentQuestionIndex];
    if (question) {
      this.questionTimer = question.time_limit; // Timer from the database
      this.startQuestionTimer();
    } else {
      console.error('No question found at index:', this.currentQuestionIndex);
      // Handle the error appropriately
    }
  }

  startQuestionTimer(): void {
    this.questionInterval = setInterval(() => {
      this.questionTimer--;
      if (this.questionTimer === 0) {
        clearInterval(this.questionInterval);
        this.displayChoices();
      }
    }, 1000);
  }

  displayChoices(): void {
    this.showChoices = true;
    this.shuffleAnswers();
  }

  shuffleAnswers(): void {
    if (this.questions[this.currentQuestionIndex]?.answers) {
      this.shuffledAnswers = [...this.questions[this.currentQuestionIndex].answers];
      this.shuffledAnswers.sort(() => Math.random() - 0.5);

      const positions = [
        { top: '10%', left: '10%' },
        { top: '10%', left: '70%' },
        { top: '70%', left: '10%' },
        { top: '70%', left: '70%' },
      ];

      positions.sort(() => Math.random() - 0.5);

      // Wait for the DOM to update
      setTimeout(() => {
        this.choiceElements.forEach((element, index) => {
          if (index < positions.length) {
            element.nativeElement.style.position = 'absolute';
            element.nativeElement.style.top = positions[index].top;
            element.nativeElement.style.left = positions[index].left;
            // Apply color styling
            const colors = ['RED', 'BLUE', 'YELLOW', 'GREEN'];
            element.nativeElement.style.backgroundColor = colors[index];
          }
        });
      }, 0);
    }
  }

  checkAnswer(selectedAnswer: Answer): void {
    this.selectedAnswer = selectedAnswer;
    this.correctAnswer = this.questions[this.currentQuestionIndex].answers.find(ans => ans.is_correct) || null;

    if (selectedAnswer === this.correctAnswer) {
      console.log('Correct Answer!');
    } else {
      console.log('Incorrect Answer!');
    }

    this.moveToNextQuestion();
  }

  moveToNextQuestion(): void {
    this.currentQuestionIndex++;
    console.log('Moving to Question Index:', this.currentQuestionIndex);

    if (this.currentQuestionIndex < this.questions.length) {
      this.showQuestion = false;
      this.showChoices = false;
      this.selectedAnswer = null;
      this.countdown = 5;
      this.startCountdown();
    } else {
      console.log('Exam completed!');
      // Handle exam completion logic here
      this.currentQuestionIndex = this.questions.length - 1; // Optional: Keep it within bounds
    }
  }
}

interface Question {
  question_text: string;
  question_type: string;
  time_limit: number;
  answers: Answer[];
}

interface Answer {
  answer_text: string;
  is_correct: boolean;
}
