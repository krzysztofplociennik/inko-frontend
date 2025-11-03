import { Component, OnInit, OnDestroy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

import { ThemeService, ThemeConfig } from '../services/theme.service';
import { AuthService } from '../auth/auth.service';
import { getBaseUrl } from '../utils/urlUtils';
import { LastActivePageService } from '../services/last-active-page.service';

interface BannerConfig {
  path: string;
  alt: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterLink, ButtonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isLoggedIn = signal(false);
  currentTheme = signal<ThemeConfig>({ dark: false });
  
  bannerConfig = computed<BannerConfig | null>(() => {
    const baseUrl = getBaseUrl();
    const bannerMap: Record<string, BannerConfig> = {
      'http://localhost:8080': {
        path: '../../../assets/graphics/banner/dev.png',
        alt: 'Development Environment'
      },
      'demo': {
        path: '../../../assets/graphics/banner/demo.png',
        alt: 'Demo Environment'
      }
    };
    return bannerMap[baseUrl] || null;
  });

  themeIcon = computed(() => 
    this.currentTheme().dark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
  );

  themeLabel = computed(() => 
    this.currentTheme().dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
  );

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private lastActivePageService: LastActivePageService
  ) {}

  ngOnInit(): void {
    this.authService.loginState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => this.isLoggedIn.set(state));

    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => this.currentTheme.set(theme));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  logout() {
    try {
      this.authService.clearToken();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You have been successfully logged out!'
      });
      // this.router.navigate(['/']);
      this.router.navigate([this.lastActivePageService.getLastActiveUrl()]);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'An error occurred during logout'
      });
    }
  }

  isDarkMode(): boolean {
    return this.currentTheme().dark;
  }
}