import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private messageService: MessageService
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.clearToken();
      this.router.navigate(['/login']);
      this.showLogoutMessage();
      return false;
    }
  }

  private showLogoutMessage() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'You have been logged out because of the inactivity.',
      life: 5000
    });
  }
}
