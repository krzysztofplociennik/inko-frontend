import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotifierService {
  private timeoutHandle: any;

  constructor(private messageService: MessageService) {}

  showDelayedMessage(delayMs: number = 6000, message?: string): void {
    this.clearMessage();

    this.timeoutHandle = setTimeout(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Still loading...',
        detail: message ?? 'This may take up to 20–30 seconds on first load',
        life: 6000
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
