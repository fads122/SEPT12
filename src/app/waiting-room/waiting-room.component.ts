import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiting-room',
  templateUrl: './waiting-room.component.html',
  styleUrls: ['./waiting-room.component.css']
})
export class WaitingRoomComponent implements OnInit {
  examId: string | null = null;
  participants: string[] = [];
  isTeacher: boolean = false; // Ensure this is set appropriately

  constructor(
    private route: ActivatedRoute,
    private wsService: WebSocketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId');

    // Removed wsService.connect() as the connection is established in the service constructor
    this.wsService.getMessages().subscribe((message: any) => {
      if (message.type === 'update_participants') {
        this.participants = message.participants;
      } else if (message.type === 'start_exam') {
        // Navigate to the gamified exam component upon starting the exam
        this.router.navigate(['/path-to-gamified-exam']); // Replace '/path-to-gamified-exam' with the actual path
      }
    });

    this.wsService.sendMessage({ type: 'join_exam', examId: this.examId, studentId: 'some_student_id' });
  }

  startExam() {
    console.log('Exam started by teacher');
    // Implement exam start logic here
  }
}
