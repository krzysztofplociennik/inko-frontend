import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  secureData: string = '';

  constructor(private authService: AuthService) {
    this.loadSecureData();
  }

  loadSecureData(): void {
    this.authService.getSecureData().subscribe({
      next: (data) => {
        this.secureData = data.message;
      },
      error: (err) => {
        console.error('Failed to load secure data', err);
      },
    });
  }

  logout(): void {
    this.authService.clearToken();
    window.location.href = '/login';
  }
}
