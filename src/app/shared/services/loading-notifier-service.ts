import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotifierService {
  private timeoutHandle: any;

  constructor(private messageService: MessageService) {}

  showDelayedMessage(delayMs: number = 10000, message?: string): void {
    this.clearMessage();

    this.timeoutHandle = setTimeout(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Still loading...',
        detail: message ?? 'Fetching the data may take longer than usual. Hang on tight!',
        life: 10000
      });
    }, delayMs);
  }

  clearMessage(): void {
    if (this.timeoutHandle) {
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = null;
    }
  }
}
