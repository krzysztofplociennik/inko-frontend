import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      this.darkMode = true;
      document.body.classList.add('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }
}