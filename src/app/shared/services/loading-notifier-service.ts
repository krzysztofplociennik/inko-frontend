import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class LoadingNotifierService {
  private timeoutHandle: any;

  constructor(private messageService: MessageService) {}

  showDelayedMessage(delayMs: number = 3_500, message?: string): void {
    this.clearMessage();

    this.timeoutHandle = setTimeout(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Still loading...',
        detail: message ?? 'This may take up to 20-30 seconds on the first loading.',
        life: 7_000
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
