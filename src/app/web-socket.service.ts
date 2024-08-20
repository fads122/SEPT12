import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  private messagesSubject = new Subject<any>();

  constructor() {
    this.socket = new WebSocket('ws://localhost:3000'); // Adjust URL as needed

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messagesSubject.next(data);
    };

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: any) {
    this.socket.send(JSON.stringify(message));
  }

  getMessages() {
    return this.messagesSubject.asObservable();
  }
}
