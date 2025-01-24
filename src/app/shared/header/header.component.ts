import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit {
  search_articles: string | any[] | null | undefined = 'search';
  home: string | any[] | null | undefined = 'home';
  articles: string | any[] | null | undefined = 'articles';
  about: string | any[] | null | undefined = 'about';

  isLoggedIn: boolean;

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {
    this.isLoggedIn = false;
  }

  ngOnInit(): void {
    this.authService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }

  login() {
    this.isLoggedIn = true;
    console.log('isLoggedIn: ' + this.isLoggedIn);
  }

  logout() {
    this.authService.clearToken();
    this.messageService.add({severity:'success', summary:'Success', detail:'You have been successfully logged out!'});
    this.router.navigate(['/']);
  }
}