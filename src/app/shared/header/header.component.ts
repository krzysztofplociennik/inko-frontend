import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../auth/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { getBaseUrl } from '../utils/urlUtils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit {
  search_articles: string | any[] | null | undefined = 'search';
  articles: string | any[] | null | undefined = 'articles';

  isLoggedIn: boolean;

  @ViewChild('banner') bannerImg!: ElementRef<HTMLImageElement>;
  bannerImagePath: string | null = null;

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

    this.resolveBannerPath();
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
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have been successfully logged out!' });
    this.router.navigate(['/']);
  }

  resolveBannerPath() {
    const path = this.getBannerPath();
    if (path) {
      this.bannerImagePath = path;
    }
  }

  getBannerPath() {
    switch (getBaseUrl()) {
      case 'http://localhost:8080':
        return '../../../assets/graphics/banner/dev.png';
      case 'https://inko-demo.onrender.com/':
        return '../../../assets/graphics/banner/demo.png';
      default:
        return null;
    }
  }
}